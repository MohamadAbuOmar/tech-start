import { NextRequest, NextResponse } from "next/server";
import { handleFileUpload } from "@/lib/upload-handler";

export const runtime = 'nodejs';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }
    const result = await handleFileUpload(file, 'image');
    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    console.error('Error in upload route:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to process image upload' 
    }, { status: 500 });
  }
}
