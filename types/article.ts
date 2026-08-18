export type Category = 'Politics' | 'Tech' | 'Culture' | 'Business' | 'Science' | 'Opinion'

export interface Author {
  id: string
  name: string
  username: string
  avatar: string
  bio?: string
}

export interface Article {
  id: string
  title: string
  slug: string
  subtitle?: string
  excerpt?: string
  content?: string
  category: Category
  author: Author
  publishedAt: string
  readTime?: number
  coverImage?: string
  tags: string[]
  views?: number
  status?: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED'
  jsonLd?: Record<string, unknown>
  metaTitle?: string
  metaDesc?: string
  ogImage?: string
  isExclusive?: boolean
}

export type Screen = 'home' | 'search' | 'category' | 'article'