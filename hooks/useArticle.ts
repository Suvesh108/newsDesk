import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Article, Category } from '@/types/article'

interface CreateArticleInput {
  title: string
  content: string
  category: Category
  status?: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED'
  tags?: string[]
  coverImage?: string
}

interface UpdateArticleInput extends Partial<CreateArticleInput> {
  excerpt?: string
  metaTitle?: string
  metaDesc?: string
  ogImage?: string
  jsonLd?: Record<string, unknown>
  readTime?: number
}

export function useArticles(options?: {
  status?: string
  category?: string
  page?: number
  limit?: number
}) {
  const params = new URLSearchParams()
  if (options?.status) params.set('status', options.status)
  if (options?.category) params.set('category', options.category)
  if (options?.page) params.set('page', options.page.toString())
  if (options?.limit) params.set('limit', options.limit.toString())

  return useQuery({
    queryKey: ['articles', options],
    queryFn: async () => {
      const response = await fetch(`/api/articles?${params.toString()}`)
      const data = await response.json()
      return data.data as { articles: Article[]; total: number; page: number; totalPages: number }
    },
  })
}

export function useArticle(id: string) {
  return useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      const response = await fetch(`/api/articles/${id}`)
      const data = await response.json()
      return data.data as Article
    },
    enabled: !!id,
  })
}

export function useCreateArticle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: CreateArticleInput) => {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      return data.data as Article
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
  })
}

export function useUpdateArticle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateArticleInput & { id: string }) => {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      return data.data as Article
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      queryClient.invalidateQueries({ queryKey: ['article', id] })
    },
  })
}

export function useDeleteArticle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/articles/${id}`, { method: 'DELETE' })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
  })
}