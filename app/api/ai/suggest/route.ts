import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { suggestHeadlines } from '@/lib/ai/suggestHeadlines'

const suggestSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content } = suggestSchema.parse(body)

    const suggestions = await suggestHeadlines(title, content)

    return NextResponse.json({ data: suggestions, error: null })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ data: null, error: error.errors }, { status: 400 })
    }
    console.error('POST /api/ai/suggest error:', error)
    return NextResponse.json({ data: null, error: 'Failed to generate suggestions' }, { status: 500 })
  }
}