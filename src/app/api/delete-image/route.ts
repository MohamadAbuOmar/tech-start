import { NextRequest, NextResponse } from "next/server";
import { handleFileDelete } from "@/lib/file-handler";
import db from "@/app/db/db";

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, galleryId } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: "No image URL provided" },
        { status: 400 }
      );
    }

    const deleteResult = await handleFileDelete(imageUrl, 'image');
    
    if (deleteResult.success && galleryId) {
      try {
        await db.image.deleteMany({
          where: { 
            url: imageUrl,
            galleryId 
          }
        });
      } catch (dbError) {
        console.error("Database operation failed:", dbError);
        return NextResponse.json({ 
          success: true, 
          warning: "File deleted but database update failed",
          status: 200 
        });
      }
    }

    return NextResponse.json(deleteResult, { status: deleteResult.status });
  } catch (error) {
    console.error("Error in delete-image route:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to process delete request" },
      { status: 500 }
    );
  }
}
