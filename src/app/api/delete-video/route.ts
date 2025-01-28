import { NextResponse } from 'next/server'
import { handleFileDelete } from '@/lib/file-handler'
import db from '@/app/db/db'

export async function POST(request: Request) {
  try {
    const { url, galleryId } = await request.json()

    if (!url) {
      return NextResponse.json({ success: false, error: 'No URL provided' }, { status: 400 })
    }

    // For YouTube videos, just remove from database
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      if (galleryId) {
        await db.video.deleteMany({
          where: { 
            url,
            galleryId 
          }
        });
      }
      return NextResponse.json({ success: true, status: 200 })
    }

    // For local files, handle both database and file system
    const deleteResult = await handleFileDelete(url, 'video')
    
    if (deleteResult.success && galleryId) {
      try {
        await db.video.deleteMany({
          where: { 
            url,
            galleryId 
          }
        });
      } catch (dbError) {
        console.error("Database operation failed:", dbError);
        // Return success since file was deleted
        return NextResponse.json({ 
          success: true, 
          warning: "File deleted but database update failed",
          status: 200 
        })
      }
    }

    return NextResponse.json(deleteResult, { status: deleteResult.status })
  } catch (error) {
    console.error('Error in delete-video route:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to process delete request' 
    }, { status: 500 })
  }
}
