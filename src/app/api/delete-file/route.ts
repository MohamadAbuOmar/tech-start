import { type NextRequest, NextResponse } from "next/server"
import { unlink } from "fs/promises"
import path from "path"

export async function DELETE(request: NextRequest) {
  try {
    const fileUrl = request.nextUrl.searchParams.get('fileUrl');

    if (!fileUrl) {
      return NextResponse.json({ success: false, error: "No file URL provided" }, { status: 400 })
    }

    // Remove any leading slash and decode the URL
    const cleanFileUrl = decodeURIComponent(fileUrl).replace(/^\//, '');
    
    // Construct the full file path
    const filepath = path.join(process.cwd(), "public", cleanFileUrl);

    try {
      await unlink(filepath);
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Error deleting file:", error);
      return NextResponse.json({ success: false, error: "File not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error in delete route:", error);
    return NextResponse.json({ success: false, error: "Failed to delete file" }, { status: 500 });
  }
}

