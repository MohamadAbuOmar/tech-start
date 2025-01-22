import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(process.cwd(), "public/images", filename);

  try {
    await writeFile(filepath, buffer);
    return NextResponse.json({ success: true, url: `/images/${filename}` });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save file" },
      { status: 500 }
    );
  }
}
