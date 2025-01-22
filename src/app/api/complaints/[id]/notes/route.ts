import { NextResponse } from 'next/server'
import db from '@/app/db/db'

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { content, authorName } = await req.json()
    
    const note = await db.complaintNote.create({
      data: {
        content,
        authorName,
        complaintId: params.id,
      },
    })

    return NextResponse.json(note)
  } catch (error) {
    console.error('Error creating note:', error)
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    )
  }
}
