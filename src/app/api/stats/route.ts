import { NextResponse } from 'next/server';
import { getStats } from '@/app/actions/pages/stats';

export async function POST(request: Request) {
  try {
    const { language } = await request.json();
    const response = await getStats(language || 'en');
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in stats API:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch stats' 
    }, { status: 500 });
  }
}
