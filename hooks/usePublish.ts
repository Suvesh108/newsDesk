import { useMutation } from '@tanstack/react-query'

interface PublishResult {
  url: string
  metaTitle: string
  metaDesc: string
  slug: string
  tags: string[]
  jsonLd: Record<string, unknown>
}

export function usePublish() {
  return useMutation({
    mutationFn: async (articleId: string) => {
      const response = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      return data.data as PublishResult
    },
  })
}