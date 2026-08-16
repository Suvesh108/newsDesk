import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import slugify from 'slugify'

const createArticleSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  category: z.enum(['Politics', 'Tech', 'Culture', 'Business', 'Science', 'Opinion']),
  status: z.enum(['DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED']).optional(),
  tags: z.array(z.string()).optional(),
  coverImage: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const where: any = {}
    if (status) where.status = status
    if (category) where.category = category

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        include: { author: { select: { id: true, name: true, image: true, username: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.article.count({ where }),
    ])

    return NextResponse.json({
      data: { articles, total, page, totalPages: Math.ceil(total / limit) },
      error: null,
    })
  } catch (error) {
    console.error('GET /api/articles error:', error)
    return NextResponse.json({ data: null, error: 'Failed to fetch articles' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validated = createArticleSchema.parse(body)

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) {
      return NextResponse.json({ data: null, error: 'User not found' }, { status: 404 })
    }

    const baseSlug = slugify(validated.title, { lower: true, strict: true })
    const slug = `${baseSlug}-${Date.now().toString(36)}`

    const article = await prisma.article.create({
      data: {
        title: validated.title,
        slug,
        content: validated.content,
        category: validated.category,
        status: validated.status || 'DRAFT',
        tags: validated.tags || [],
        coverImage: validated.coverImage,
        authorId: user.id,
      },
    })

    return NextResponse.json({ data: article, error: null }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ data: null, error: error.errors }, { status: 400 })
    }
    console.error('POST /api/articles error:', error)
    return NextResponse.json({ data: null, error: 'Failed to create article' }, { status: 500 })
  }
}