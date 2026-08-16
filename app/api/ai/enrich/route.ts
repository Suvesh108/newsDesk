import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { enrichArticle } from '@/lib/ai/enrichArticle'

const enrichSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  category: z.enum(['Politics', 'Tech', 'Culture', 'Business', 'Science', 'Opinion']),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, category } = enrichSchema.parse(body)

    const enriched = await enrichArticle(title, content, category)

    return NextResponse.json({ data: enriched, error: null })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ data: null, error: error.errors }, { status: 400 })
    }
    console.error('POST /api/ai/enrich error:', error)
    return NextResponse.json({ data: null, error: 'Failed to enrich article' }, { status: 500 })
  }
}