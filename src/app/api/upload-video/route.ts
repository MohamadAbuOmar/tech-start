import { NextRequest } from 'next/server'
import db from '@/app/db/db'
import { z } from 'zod'
import { handleFileUpload } from '@/lib/upload-handler'

const videoSchema = z.object({
  type: z.enum(['youtube', 'local']),
  url: z.string(),
  galleryId: z.string(),
  title_en: z.string(),
  title_ar: z.string(),
  description_en: z.string().optional(),
  description_ar: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let videoData;
    let clonedRequest = request.clone();

    if (contentType.includes('application/json')) {
      const body = await clonedRequest.json();
      const result = videoSchema.safeParse(body);
      
      if (!result.success) {
        return Response.json({ success: false, error: result.error.message }, { status: 400 });
      }

      const { type, url, galleryId, title_en, title_ar, description_en, description_ar } = result.data;

      if (type === 'youtube') {
        const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1];
        if (!videoId) {
          return Response.json({ success: false, error: 'Invalid YouTube URL' }, { status: 400 });
        }

        videoData = {
          url: `https://www.youtube.com/embed/${videoId}`,
          type: 'youtube',
          galleryId,
          title_en,
          title_ar,
          description_en,
          description_ar
        };
      }
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await clonedRequest.formData();
      const galleryId = formData.get('galleryId') as string;
      
      // Validate gallery exists before file upload
      const gallery = await db.videoGallery.findUnique({
        where: { id: galleryId }
      });

      if (!gallery) {
        return Response.json({ success: false, error: 'Gallery not found' }, { status: 404 });
      }

      const file = formData.get('file') as File;
      if (!file) {
        return Response.json({ success: false, error: 'No file provided' }, { status: 400 });
      }

      const uploadResult = await handleFileUpload(file, 'video');
      if (!uploadResult.success) {
        return Response.json(uploadResult, { status: uploadResult.status });
      }

      videoData = {
        type: 'local',
        url: uploadResult.url,
        galleryId,
        title_en: formData.get('title_en') as string || '',
        title_ar: formData.get('title_ar') as string || '',
        description_en: formData.get('description_en') as string || '',
        description_ar: formData.get('description_ar') as string || ''
      };
    } else {
      return Response.json({ success: false, error: 'Invalid content type' }, { status: 400 });
    }

    const video = await db.video.create({ data: videoData });
    return Response.json({ success: true, video }, { status: 200 });
  } catch (error) {
    console.error('Error in upload-video route:', error);
    return Response.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to process video upload' 
    }, { status: 500 });
  }
}

