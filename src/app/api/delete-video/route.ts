import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ success: false, error: 'No URL provided' }, { status: 400 })
    }

    const publicPath = path.join(process.cwd(), 'public')
    const relativePath = url.startsWith('/') ? url.slice(1) : url
    const filePath = path.join(publicPath, relativePath)

    if (!filePath.startsWith(publicPath)) {
      return NextResponse.json({ success: false, error: 'Invalid file path' }, { status: 400 })
    }

    try {
      await fs.access(filePath)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.error('File not found:', filePath)
      return NextResponse.json({ success: false, error: 'File not found' }, { status: 404 })
    }

    try {
      await fs.unlink(filePath)
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('Error deleting file:', error)
      return NextResponse.json({ success: false, error: 'Failed to delete file', details: (error as Error).message }, { status: 500 })
    }
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ success: false, error: 'Unexpected error occurred', details: (error as Error).message }, { status: 500 })
  }
}
