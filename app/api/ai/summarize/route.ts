import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { summarizeForSocial } from '@/lib/ai/suggestHeadlines'

const summarizeSchema = z.object({
  content: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content } = summarizeSchema.parse(body)

    const summary = await summarizeForSocial(content)

    return NextResponse.json({ data: { summary }, error: null })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ data: null, error: error.errors }, { status: 400 })
    }
    console.error('POST /api/ai/summarize error:', error)
    return NextResponse.json({ data: null, error: 'Failed to summarize' }, { status: 500 })
  }
}