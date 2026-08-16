import { useMutation } from '@tanstack/react-query'
import { Category } from '@/types/article'

interface EnrichedData {
  metaTitle: string
  metaDescription: string
  slug: string
  tags: string[]
  excerpt: string
  readTime: number
  jsonLd: Record<string, unknown>
}

export function useAIEnrich() {
  return useMutation({
    mutationFn: async ({
      title,
      content,
      category,
    }: {
      title: string
      content: string
      category: Category
    }) => {
      const response = await fetch('/api/ai/enrich', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      return data.data as EnrichedData
    },
  })
}

export function useHeadlineSuggest() {
  return useMutation({
    mutationFn: async ({ title, content }: { title: string; content: string }) => {
      const response = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      return data.data as Array<{ headline: string; style: string }>
    },
  })
}

export function useSummarize() {
  return useMutation({
    mutationFn: async (content: string) => {
      const response = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      return data.data as { summary: string }
    },
  })
}