import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export interface EnrichedArticle {
  metaTitle: string
  metaDescription: string
  slug: string
  tags: string[]
  excerpt: string
  readTime: number
  jsonLd: Record<string, unknown>
}

export async function enrichArticle(
  title: string,
  content: string,
  category: string
): Promise<EnrichedArticle> {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: `You are an expert SEO analyst. Analyze this article and return ONLY valid JSON.

Title: ${title}
Category: ${category}
Content: ${content.slice(0, 5000)}

Return exactly this JSON structure:
{
  "metaTitle": "string (max 60 chars, keyword first)",
  "metaDescription": "string (max 155 chars, action-oriented)",
  "slug": "kebab-case-url-friendly",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "excerpt": "2 sentences compelling summary",
  "readTime": number,
  "jsonLd": {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "string",
    "image": ["string"],
    "datePublished": "ISO date",
    "dateModified": "ISO date",
    "author": {"@type": "Person", "name": "string"},
    "publisher": {"@type": "Organization", "name": "NewsDesk"}
  }
}`
      }
    ]
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''
  return JSON.parse(text.trim())
}