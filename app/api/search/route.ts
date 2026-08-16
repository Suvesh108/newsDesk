import { NextRequest, NextResponse } from 'next/server'
import { searchArticles } from '@/lib/search'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const category = searchParams.get('category')

    if (!query) {
      return NextResponse.json({ data: null, error: 'Query required' }, { status: 400 })
    }

    const filter = category ? `category = "${category}"` : undefined
    const results = await searchArticles(query, { limit, offset, filter })

    return NextResponse.json({ data: results, error: null })
  } catch (error) {
    console.error('GET /api/search error:', error)
    return NextResponse.json({ data: null, error: 'Search failed' }, { status: 500 })
  }
}