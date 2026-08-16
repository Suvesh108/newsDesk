import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export interface HeadlineSuggestion {
  headline: string
  style: 'direct' | 'question' | 'provocative' | 'numbered'
}

export async function suggestHeadlines(title: string, content: string): Promise<HeadlineSuggestion[]> {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `Generate 5 headline variations for this article. Return ONLY valid JSON array:
[
  {"headline": "Headline text", "style": "direct|question|provocative|numbered"},
  ...
]

Title: ${title}
Content: ${content.slice(0, 2000)}`
      }
    ]
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  return JSON.parse(text.trim())
}

export async function summarizeForSocial(content: string): Promise<string> {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 280,
    messages: [
      {
        role: 'user',
        content: `Create a compelling social media snippet (max 280 chars) for this content. Return ONLY the text:
${content.slice(0, 2000)}`
      }
    ]
  })

  return response.content[0].type === 'text' ? response.content[0].text.trim() : ''
}