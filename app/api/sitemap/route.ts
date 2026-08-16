import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://newsdesk.com'

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true, category: true },
      orderBy: { publishedAt: 'desc' },
    })

    const categories = ['Politics', 'Tech', 'Culture', 'Business', 'Science', 'Opinion']

    const staticPages = [
      { url: BASE_URL, priority: '1.0', changefreq: 'daily' },
      { url: `${BASE_URL}/search`, priority: '0.5', changefreq: 'weekly' },
      { url: `${BASE_URL}/newsletter`, priority: '0.6', changefreq: 'weekly' },
      ...categories.map(cat => ({
        url: `${BASE_URL}/${cat.toLowerCase()}`,
        priority: '0.8',
        changefreq: 'daily',
      })),
    ]

    const articleUrls = articles.map(article => ({
      url: `${BASE_URL}/article/${article.slug}`,
      lastmod: article.updatedAt.toISOString(),
      priority: '0.9',
      changefreq: 'weekly',
    }))

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <priority>${page.priority}</priority>
    <changefreq>${page.changefreq}</changefreq>
  </url>`).join('\n')}
${articleUrls.map(article => `  <url>
    <loc>${article.url}</loc>
    <lastmod>${article.lastmod}</lastmod>
    <priority>${article.priority}</priority>
    <changefreq>weekly</changefreq>
  </url>`).join('\n')}
</urlset>`

    return new NextResponse(sitemap, {
      headers: { 'Content-Type': 'application/xml' },
    })
  } catch (error) {
    console.error('GET /api/sitemap error:', error)
    return NextResponse.json({ data: null, error: 'Failed to generate sitemap' }, { status: 500 })
  }
}