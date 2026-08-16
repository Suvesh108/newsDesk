'use client'

import { StatsCard } from '@/components/dashboard/StatsCard'
import { StoryTable } from '@/components/dashboard/StoryTable'
import { QuickPublishModal } from '@/components/dashboard/QuickPublishModal'
import { useState } from 'react'
import Link from 'next/link'
import { PenLine, FolderOpen, TrendingUp, Eye, FileText } from 'lucide-react'
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
]

export default function DashboardPage() {
  const [articles, setArticles] = useState<Article[]>(mockArticles)
  const [publishModalOpen, setPublishModalOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

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
  }

  const handleStatusChange = (id: string, status: string) => {
    setArticles(prev =>
      prev.map(a => (a.id === id ? { ...a, status: status as Article['status'] } : a))
    )
  }

  return (
      <div className="space-y-6 lg:space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl lg:text-6xl font-black mb-2">Dashboard</h1>
            <p className="label-mono opacity-100">System overview and quick actions</p>
          </div>
          <Link
            href="/dashboard/editor/new"
            className="flex items-center gap-2 bg-primary text-on-primary px-4 lg:px-6 py-3 lg:py-4 font-display font-bold uppercase text-sm lg:text-base hover:opacity-90 transition-opacity"
          >
            <PenLine size={18} />
            New Article
          </Link>
        </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <StatsCard
          title="Total Articles"
          value={articles.length}
          icon={<FileText size={20} />}
        />
        <StatsCard
          title="Published"
          value={articles.filter(a => a.status === 'PUBLISHED').length}
          icon={<FolderOpen size={20} />}
        />
        <StatsCard
          title="Total Views"
          value={articles.reduce((sum, a) => sum + (a.views || 0), 0).toLocaleString()}
          icon={<Eye size={20} />}
          change={12.5}
        />
        <StatsCard
          title="Engagement"
          value="4.2%"
          icon={<TrendingUp size={20} />}
          change={-2.3}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <h2 className="text-2xl lg:text-3xl font-black">Recent Stories</h2>
          <Link href="/dashboard/stories" className="label-mono hover:text-primary transition-colors">
            View All →
          </Link>
        </div>
        <StoryTable
          articles={articles.slice(0, 5)}
          onEdit={(article) => window.location.href = `/dashboard/editor/${article.id}`}
          onDelete={(id) => setArticles(prev => prev.filter(a => a.id !== id))}
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