import { NextRequest } from "next/server";
import db from "@/app/db/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const gallery = await db.videoGallery.findUnique({
      where: { id: params.id },
      include: {
        videos: true,
      },
    });

    if (!gallery) {
      return Response.json({ success: false, error: "Gallery not found" }, { status: 404 });
    }

    return Response.json(gallery);
  } catch (error) {
    console.error("Error fetching video gallery:", error);
    return Response.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch video gallery" 
    }, { status: 500 });
  }
}
