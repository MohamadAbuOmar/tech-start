import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const { url, type } = await request.json()

    if (!url) {
      return NextResponse.json({ success: false, error: 'No URL provided' }, { status: 400 })
    }

    // If it's a YouTube video, just return success since we don't need to delete any files
    if (type === 'youtube') {
      return NextResponse.json({ success: true })
    }

    // Handle local video deletion
    const publicPath = path.join(process.cwd(), 'public')
    const relativePath = url.startsWith('/') ? url.slice(1) : url
    const filePath = path.join(publicPath, relativePath)

    if (!filePath.startsWith(publicPath)) {
      return NextResponse.json({ success: false, error: 'Invalid file path' }, { status: 400 })
    }

    try {
      await fs.access(filePath)
      await fs.unlink(filePath)
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('File operation error:', error)
      // Don't treat file not found as an error for idempotency
      return NextResponse.json({ success: true })
    }
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Unexpected error occurred', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
