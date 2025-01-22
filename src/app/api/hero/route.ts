import { createHeroStep, getHeroSteps } from '@/app/actions/pages/hero'
import { heroStepSchema} from '@/types/hero'
import { NextResponse } from 'next/server'

export async function GET() {
  const result = await getHeroSteps()
  return NextResponse.json(result)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const parsedData = {
      ...data,
      order: Number(data.order)
    }
    
    const validationResult = heroStepSchema.safeParse(parsedData)

    if (!validationResult.success) {
      return NextResponse.json({
        success: false,
        error: validationResult.error.flatten().fieldErrors
      }, { status: 400 })
    }

    const result = await createHeroStep(validationResult.data)
    return NextResponse.json(result, { 
      status: result.success ? 200 : 400 
    })
  } catch (error) {
    console.error('Error in POST /api/hero:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create hero step'
    }, { status: 500 })
  }
}
