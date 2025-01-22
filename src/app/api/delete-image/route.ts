import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  const { imageUrl } = await request.json();

  if (!imageUrl) {
    return NextResponse.json(
      { success: false, error: "No image URL provided" },
      { status: 400 }
    );
  }

  const filename = path.basename(imageUrl);
  const filepath = path.join(process.cwd(), "public/images", filename);

  try {
    await unlink(filepath);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
