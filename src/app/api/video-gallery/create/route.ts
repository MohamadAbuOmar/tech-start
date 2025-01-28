import { NextRequest } from "next/server";
import db from "@/app/db/db";

export async function POST(request: NextRequest) {
  try {
    const { title_en, title_ar, description_en, description_ar } = await request.json();

    if (!title_en || !title_ar) {
      return Response.json({ success: false, error: "Title is required in both languages" }, { status: 400 });
    }

    const gallery = await db.videoGallery.create({
      data: {
        title_en,
        title_ar,
        description_en: description_en || "",
        description_ar: description_ar || "",
        videos: { create: [] }
      },
    });

    return Response.json({ success: true, gallery });
  } catch (error) {
    console.error("Error creating video gallery:", error);
    return Response.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to create video gallery" 
    }, { status: 500 });
  }
}
