'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Filter, Download } from 'lucide-react'
import { StoryTable } from '@/components/dashboard/StoryTable'
import { QuickPublishModal } from '@/components/dashboard/QuickPublishModal'
import { Article } from '@/types/article'

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Global Markets Brace for Unprecedented Shift as Central Banks Pivot',
    slug: 'global-markets-central-banks-pivot',
    category: 'Business',
    author: { id: '1', name: 'Eleanor Vance', username: 'eleanor', avatar: '' },
    publishedAt: '2024-10-24',
    readTime: 12,
    tags: ['Economy', 'Finance'],
    views: 15420,
    status: 'PUBLISHED',
  },
  {
    id: '2',
    title: 'The Silicon Ceiling: Why Next-Gen Models Face Physical Limits',
    slug: 'silicon-ceiling-next-gen-models-physical-limits',
    category: 'Tech',
    author: { id: '2', name: 'Elena Rostova', username: 'elena', avatar: '' },
    publishedAt: '2024-10-23',
    readTime: 4,
    tags: ['AI', 'Hardware'],
    views: 8932,
    status: 'PUBLISHED',
    isExclusive: true,
  },
  {
    id: '3',
    title: 'The Dawn of Sentient Algorithms in Silicon Valley',
    slug: 'dawn-sentient-algorithms-silicon-valley',
    category: 'Tech',
    author: { id: '1', name: 'Eleanor Vance', username: 'eleanor', avatar: '' },
    publishedAt: '2024-10-22',
    readTime: 8,
    tags: ['AI', 'Ethics'],
    views: 12453,
    status: 'DRAFT',
  },
  {
    id: '4',
    title: 'Legislative Deadlock Broken in Historic Vote',
    slug: 'legislative-deadlock-broken-historic-vote',
    category: 'Politics',
    author: { id: '3', name: 'Marcus Chen', username: 'marcus', avatar: '' },
    publishedAt: '2024-10-21',
    readTime: 6,
    tags: ['Politics', 'Infrastructure'],
    views: 7821,
    status: 'DRAFT',
  },
]

export default function StoriesPage() {
  const [articles, setArticles] = useState<Article[]>(mockArticles)
  const [filter, setFilter] = useState<string>('all')
  const [publishModalOpen, setPublishModalOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const filteredArticles = filter === 'all'
    ? articles
    : articles.filter(a => a.status?.toLowerCase() === filter.toLowerCase())

  const handlePublish = (article: Article) => {
    setSelectedArticle(article)
    setPublishModalOpen(true)
  }

  const handleConfirmPublish = async () => {
    if (!selectedArticle) return
    await new Promise(resolve => setTimeout(resolve, 2000))
    setArticles(prev =>
      prev.map(a => (a.id === selectedArticle.id ? { ...a, status: 'PUBLISHED' as const } : a))
    )
    setPublishModalOpen(false)
  }

  const handleStatusChange = (id: string, status: string) => {
    setArticles(prev =>
      prev.map(a => (a.id === id ? { ...a, status: status as Article['status'] } : a))
    )
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      setArticles(prev => prev.filter(a => a.id !== id))
    }
  }

  return (
    <div className="space-y-6 lg:space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl lg:text-6xl font-black mb-2">Stories</h1>
          <p className="label-mono opacity-100">Manage and organize your articles</p>
        </div>
        <div className="flex items-center gap-2 lg:gap-4 flex-wrap">
          <div className="flex items-center gap-2 brutalist-border px-3 lg:px-4 py-2">
            <Filter size={14} />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent font-mono text-xs lg:text-sm outline-none cursor-pointer"
            >
              <option value="all">All</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <button className="flex items-center gap-2 brutalist-border px-3 lg:px-4 py-2 hover-invert label-mono opacity-100">
            <Download size={14} />
            Export
          </button>
          <Link
            href="/dashboard/editor/new"
            className="flex items-center gap-2 bg-primary text-on-primary px-4 lg:px-6 py-3 lg:py-4 font-display font-bold uppercase text-sm lg:text-base hover:opacity-90 transition-opacity"
          >
            <Plus size={18} />
            New Article
          </Link>
        </div>
      </div>

      <div className="brutalist-border overflow-hidden">
        <StoryTable
          articles={filteredArticles}
          onEdit={(article) => window.location.href = `/dashboard/editor/${article.id}`}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </div>

      <QuickPublishModal
        isOpen={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
        onPublish={handleConfirmPublish}
        articleTitle={selectedArticle?.title || ''}
      />
    </div>
  )
}