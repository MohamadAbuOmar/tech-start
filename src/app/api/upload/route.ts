import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, stat, unlink } from "fs/promises";
import path from "path";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp'
];

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const galleryId = data.get("galleryId") as string | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Allowed types: JPG, PNG, GIF, WebP" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename with timestamp and random string
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const safeFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}-${randomString}-${safeFilename}`;
    
    const uploadDir = path.join(process.cwd(), "public/images");
    const filepath = path.join(uploadDir, filename);

    // Ensure upload directory exists with proper permissions
    try {
      await mkdir(uploadDir, { recursive: true, mode: 0o755 });
    } catch (error) {
      console.error('Error creating upload directory:', error);
      return NextResponse.json(
        { success: false, error: "Failed to create upload directory" },
        { status: 500 }
      );
    }

    // Check if file already exists (shouldn't happen with unique names, but just in case)
    try {
      const stats = await stat(filepath);
      if (stats.isFile()) {
        return NextResponse.json(
          { success: false, error: "File already exists" },
          { status: 409 }
        );
      }
    } catch (error) {
      // File doesn't exist, which is what we want
      if (error.code !== 'ENOENT') {
        console.error('Error checking file existence:', error);
        return NextResponse.json(
          { success: false, error: "Failed to check file existence" },
          { status: 500 }
        );
      }
    }

    try {
      await writeFile(filepath, buffer);
      return NextResponse.json({ 
        success: true, 
        url: `/images/${filename}`,
        message: "File uploaded successfully"
      });
    } catch (writeError) {
      console.error("Error writing file:", writeError);
      // Try to clean up the failed upload
      try {
        await unlink(filepath);
      } catch (unlinkError) {
        console.error("Error cleaning up failed upload:", unlinkError);
      }
      return NextResponse.json(
        { 
          success: false, 
          error: "Failed to save file. Please try again.",
          details: writeError instanceof Error ? writeError.message : "Unknown error"
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in upload process:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Upload failed. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
