'use client'

import { Article } from '@/types/article'
import { Edit, Trash2, Eye } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { clsx } from 'clsx'

interface StoryTableProps {
  articles: Article[]
  onEdit: (article: Article) => void
  onDelete: (articleId: string) => void
  onStatusChange: (articleId: string, status: string) => void
}

const statusColors = {
  DRAFT: 'bg-surface-container text-on-surface-variant',
  SCHEDULED: 'bg-yellow-500/20 text-yellow-500',
  PUBLISHED: 'bg-green-500/20 text-green-500',
  ARCHIVED: 'bg-gray-500/20 text-gray-500',
}

export function StoryTable({ articles, onEdit, onDelete, onStatusChange }: StoryTableProps) {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center border border-white/10">
        <span className="label-mono text-primary mb-4 block">No stories found</span>
        <p className="font-display text-2xl font-black uppercase tracking-tighter">Nothing here yet</p>
        <p className="font-mono text-xs opacity-50 mt-3">Create your first article to get started</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left label-mono py-3 lg:py-4 px-4 lg:px-6">Title</th>
            <th className="text-left label-mono py-3 lg:py-4 px-4 lg:px-6">Status</th>
            <th className="text-left label-mono py-3 lg:py-4 px-4 lg:px-6 hidden md:table-cell">Category</th>
            <th className="text-left label-mono py-3 lg:py-4 px-4 lg:px-6 hidden md:table-cell">Views</th>
            <th className="text-left label-mono py-3 lg:py-4 px-4 lg:px-6 hidden lg:table-cell">Date</th>
            <th className="text-right label-mono py-3 lg:py-4 px-4 lg:px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <tr key={article.id} className="border-b border-white/10 hover:bg-surface-container transition-colors">
              <td className="py-3 lg:py-4 px-4 lg:px-6">
                <div className="flex items-center gap-3">
                  <span className="text-sm lg:text-lg font-display">{article.title.slice(0, 40)}{article.title.length > 40 ? '...' : ''}</span>
                </div>
              </td>
              <td className="py-3 lg:py-4 px-4 lg:px-6">
                <select
                  value={article.status || 'DRAFT'}
                  onChange={(e) => onStatusChange(article.id, e.target.value)}
                  className={clsx(
                    'px-2 lg:px-3 py-1 font-mono text-[10px] lg:text-xs uppercase border border-white/20 bg-transparent cursor-pointer',
                    statusColors[article.status as keyof typeof statusColors] || statusColors.DRAFT
                  )}
                >
                  <option value="DRAFT">Draft</option>
                  <option value="SCHEDULED">Scheduled</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </td>
              <td className="py-3 lg:py-4 px-4 lg:px-6 hidden md:table-cell">
                <span className="label-mono">{article.category}</span>
              </td>
              <td className="py-3 lg:py-4 px-4 lg:px-6 hidden md:table-cell">
                <span className="font-mono text-xs lg:text-sm">{article.views?.toLocaleString() || '0'}</span>
              </td>
              <td className="py-3 lg:py-4 px-4 lg:px-6 hidden lg:table-cell">
                <span className="label-mono">
                  {article.publishedAt
                    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
                    : 'Not published'}
                </span>
              </td>
              <td className="py-3 lg:py-4 px-4 lg:px-6">
                <div className="flex items-center justify-end gap-1 lg:gap-2">
                  <button
                    onClick={() => window.open(`/article/${article.slug}`, '_blank')}
                    className="p-1.5 lg:p-2 hover:text-primary transition-colors"
                    title="Preview"
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    onClick={() => onEdit(article)}
                    className="p-1.5 lg:p-2 hover:text-primary transition-colors"
                    title="Edit"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(article.id)}
                    className="p-1.5 lg:p-2 hover:text-error transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}