import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { enrichArticle } from '@/lib/ai/enrichArticle'
import { cacheInvalidatePattern } from '@/lib/redis'
import { indexArticle } from '@/lib/search'

const publishSchema = z.object({
  articleId: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { articleId } = publishSchema.parse(body)

    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: { author: true },
    })

    if (!article) {
      return NextResponse.json({ data: null, error: 'Article not found' }, { status: 404 })
    }

    // Run AI enrichment
    const enriched = await enrichArticle(article.title, article.content, article.category)

    // Update article with enriched data
    const now = new Date()
    const updated = await prisma.article.update({
      where: { id: articleId },
      data: {
        status: 'PUBLISHED',
        publishedAt: now,
        metaTitle: enriched.metaTitle,
        metaDesc: enriched.metaDescription,
        slug: enriched.slug,
        tags: enriched.tags,
        excerpt: enriched.excerpt,
        readTime: enriched.readTime,
        jsonLd: enriched.jsonLd,
      },
    })

    // Index in search
    await indexArticle({
      id: updated.id,
      title: updated.title,
      content: updated.content,
      excerpt: updated.excerpt || '',
      category: updated.category,
      tags: updated.tags,
      authorName: article.author.name,
      publishedAt: now.toISOString(),
      slug: updated.slug,
    })

    // Clear cache
    await cacheInvalidatePattern('homepage:*')
    await cacheInvalidatePattern('articles:*')

    const url = `/article/${updated.slug}`

    return NextResponse.json({
      data: {
        url,
        metaTitle: enriched.metaTitle,
        metaDesc: enriched.metaDescription,
        slug: enriched.slug,
        tags: enriched.tags,
        jsonLd: enriched.jsonLd,
      },
      error: null,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ data: null, error: error.errors }, { status: 400 })
    }
    console.error('POST /api/publish error:', error)
    return NextResponse.json({ data: null, error: 'Failed to publish article' }, { status: 500 })
  }
}