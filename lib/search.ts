import { MeiliSearch } from 'meilisearch'

export const searchClient = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || 'http://localhost:7700',
  apiKey: process.env.MEILISEARCH_KEY,
})

export const ARTICLES_INDEX = 'articles'

export interface ArticleSearchDocument {
  id: string
  title: string
  content: string
  excerpt: string
  category: string
  tags: string[]
  authorName: string
  publishedAt: string
  slug: string
}

export async function indexArticle(article: ArticleSearchDocument): Promise<void> {
  const index = searchClient.index(ARTICLES_INDEX)
  await index.addDocuments([article])
}

export async function updateArticleIndex(article: ArticleSearchDocument): Promise<void> {
  const index = searchClient.index(ARTICLES_INDEX)
  await index.updateDocuments([article])
}

export async function removeArticleFromIndex(id: string): Promise<void> {
  const index = searchClient.index(ARTICLES_INDEX)
  await index.deleteDocument(id)
}

export async function searchArticles(query: string, options?: {
  limit?: number
  offset?: number
  filter?: string
}): Promise<{ hits: ArticleSearchDocument[]; estimatedTotalHits: number }> {
  const index = searchClient.index(ARTICLES_INDEX)
  const results = await index.search(query, {
    limit: options?.limit || 20,
    offset: options?.offset || 0,
    filter: options?.filter,
  })
  return {
    hits: results.hits as ArticleSearchDocument[],
    estimatedTotalHits: results.estimatedTotalHits || 0,
  }
}