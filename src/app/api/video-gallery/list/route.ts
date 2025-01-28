import { NextRequest } from "next/server";
import db from "@/app/db/db";

export async function GET(request: NextRequest) {
  try {
    const galleries = await db.videoGallery.findMany({
      include: {
        videos: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return Response.json(galleries);
  } catch (error) {
    console.error("Error fetching video galleries:", error);
    return Response.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch video galleries" 
    }, { status: 500 });
  }
}
