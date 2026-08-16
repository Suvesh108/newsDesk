import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

const updateArticleSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().min(1).optional(),
  category: z.enum(['Politics', 'Tech', 'Culture', 'Business', 'Science', 'Opinion']).optional(),
  status: z.enum(['DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED']).optional(),
  tags: z.array(z.string()).optional(),
  coverImage: z.string().optional(),
  excerpt: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDesc: z.string().optional(),
  ogImage: z.string().optional(),
  jsonLd: z.any().optional(),
  readTime: z.number().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: params.id },
      include: { author: { select: { id: true, name: true, image: true, username: true, bio: true } } },
    })

    if (!article) {
      return NextResponse.json({ data: null, error: 'Article not found' }, { status: 404 })
    }

    return NextResponse.json({ data: article, error: null })
  } catch (error) {
    console.error('GET /api/articles/[id] error:', error)
    return NextResponse.json({ data: null, error: 'Failed to fetch article' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validated = updateArticleSchema.parse(body)

    const article = await prisma.article.update({
      where: { id: params.id },
      data: validated,
    })

    return NextResponse.json({ data: article, error: null })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ data: null, error: error.errors }, { status: 400 })
    }
    console.error('PUT /api/articles/[id] error:', error)
    return NextResponse.json({ data: null, error: 'Failed to update article' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.article.delete({ where: { id: params.id } })

    return NextResponse.json({ data: { deleted: true }, error: null })
  } catch (error) {
    console.error('DELETE /api/articles/[id] error:', error)
    return NextResponse.json({ data: null, error: 'Failed to delete article' }, { status: 500 })
  }
}