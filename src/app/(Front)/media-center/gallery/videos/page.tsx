import { cookies } from 'next/headers'
import { VideoGallery } from "@/components/Gallery/video-gallery";
import { getGalleryVideos } from "@/app/actions/pages/gallery";

export const revalidate = 30;

export default async function VideoGalleryPage() {
  const cookieStore = cookies()
  const language = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as 'en' | 'ar'
  
  const videosResponse = await getGalleryVideos(language)
  
  if (!videosResponse.success) {
    return <div>Error loading gallery videos</div>
  }

  return <VideoGallery videos={videosResponse.data} className="min-h-screen" />;
}

