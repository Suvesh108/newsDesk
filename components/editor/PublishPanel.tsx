'use client'

import { useState } from 'react'
import { Sparkles, Zap, Loader2 } from 'lucide-react'
import { clsx } from 'clsx'
import { Category } from '@/types/article'

interface PublishPanelProps {
  title: string
  content: string
  category: Category
  tags: string[]
  coverImage: string
  excerpt: string
  metaTitle: string
  metaDesc: string
  onEnrich: () => Promise<void>
  onPublish: () => Promise<void>
  isEnriching: boolean
  isPublishing: boolean
  onTitleChange: (v: string) => void
  onContentChange: (v: string) => void
  onCategoryChange: (v: Category) => void
  onTagsChange: (v: string[]) => void
  onCoverImageChange: (v: string) => void
  onExcerptChange: (v: string) => void
  onMetaTitleChange: (v: string) => void
  onMetaDescChange: (v: string) => void
}

const categories: Category[] = ['Politics', 'Tech', 'Culture', 'Business', 'Science', 'Opinion']

export function PublishPanel({
  title,
  content,
  category,
  tags,
  coverImage,
  excerpt,
  metaTitle,
  metaDesc,
  onEnrich,
  onPublish,
  isEnriching,
  isPublishing,
  onTitleChange,
  onCategoryChange,
  onTagsChange,
  onCoverImageChange,
  onExcerptChange,
  onMetaTitleChange,
  onMetaDescChange,
}: PublishPanelProps) {
  const [tagInput, setTagInput] = useState('')

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      onTagsChange([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    onTagsChange(tags.filter(t => t !== tag))
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="label-mono mb-2 block">Title <span className="text-primary">*</span></label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className={clsx(
            'w-full bg-surface-container border p-4 font-display text-xl focus:border-primary outline-none transition-colors',
            title.length > 200 ? 'border-red-500/50' : 'border-white/10'
          )}
          placeholder="Article title..."
          maxLength={200}
        />
        <span className={clsx('text-[10px] mt-1 block', title.length > 200 ? 'text-red-400' : 'text-on-surface-variant')}>
          {title.length}/200
        </span>
      </div>

      <div>
        <label className="label-mono mb-2 block">Category <span className="text-primary">*</span></label>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as Category)}
          className="w-full bg-surface-container border border-white/10 p-4 font-mono text-sm focus:border-primary outline-none transition-colors"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="label-mono mb-2 block">Tags</label>
        <div className="flex gap-2 mb-2 flex-wrap">
          {tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-surface-container border border-white/20 font-mono text-xs flex items-center gap-2"
            >
              {tag}
              <button onClick={() => removeTag(tag)} className="hover:text-primary">×</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            className="flex-1 bg-surface-container border border-white/10 p-2 font-mono text-sm focus:border-primary outline-none"
            placeholder="Add tag..."
          />
          <button onClick={addTag} className="px-4 bg-primary text-on-primary font-mono text-sm shrink-0">Add</button>
        </div>
      </div>

      <div>
        <label className="label-mono mb-2 block">Cover Image URL</label>
        <input
          type="text"
          value={coverImage}
          onChange={(e) => onCoverImageChange(e.target.value)}
          className="w-full bg-surface-container border border-white/10 p-4 font-mono text-sm focus:border-primary outline-none transition-colors"
          placeholder="https://..."
        />
      </div>

      <div className="border-t border-white/10 pt-6">
        <div className="flex items-center justify-between mb-4">
          <span className="label-mono opacity-100">SEO Preview</span>
        </div>
        <div className="p-4 bg-surface-container border border-white/10 space-y-4">
          <div>
            <label className="label-mono text-[8px] mb-1 block">Meta Title</label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => onMetaTitleChange(e.target.value)}
              className={clsx(
                'w-full bg-surface border p-2 font-mono text-sm focus:border-primary outline-none',
                metaTitle.length > 60 ? 'border-red-500/50' : 'border-white/10'
              )}
              placeholder="SEO title..."
              maxLength={60}
            />
            <span className={clsx('text-[10px]', metaTitle.length > 60 ? 'text-red-400' : 'text-on-surface-variant')}>
              {metaTitle.length}/60
            </span>
          </div>
          <div>
            <label className="label-mono text-[8px] mb-1 block">Meta Description</label>
            <textarea
              value={metaDesc}
              onChange={(e) => onMetaDescChange(e.target.value)}
              className={clsx(
                'w-full bg-surface border p-2 font-mono text-sm focus:border-primary outline-none resize-none h-20',
                metaDesc.length > 155 ? 'border-red-500/50' : 'border-white/10'
              )}
              placeholder="SEO description..."
              maxLength={155}
            />
            <span className={clsx('text-[10px]', metaDesc.length > 155 ? 'text-red-400' : 'text-on-surface-variant')}>
              {metaDesc.length}/155
            </span>
          </div>
          <div>
            <label className="label-mono text-[8px] mb-1 block">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => onExcerptChange(e.target.value)}
              className="w-full bg-surface border border-white/10 p-2 font-mono text-sm focus:border-primary outline-none resize-none h-20"
              placeholder="Article excerpt..."
            />
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-6 border-t border-white/10">
        <button
          onClick={onEnrich}
          disabled={isEnriching || !title || !content}
          className="w-full flex items-center justify-center gap-2 brutalist-border p-4 hover-invert label-mono opacity-100 disabled:opacity-50 cursor-pointer"
          title={!title || !content ? 'Add a title and content first' : ''}
        >
          {isEnriching ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
          AI Auto SEO
        </button>

        <button
          onClick={onPublish}
          disabled={isPublishing || !title || !content}
          className={clsx(
            'w-full flex items-center justify-center gap-2 p-4 font-display font-bold uppercase tracking-wider transition-all',
            'bg-primary text-on-primary hover:opacity-90',
            'disabled:opacity-50 cursor-pointer'
          )}
          title={!title || !content ? 'Add a title and content first' : ''}
        >
          {isPublishing ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Publishing...
            </>
          ) : (
            <>
              <Zap size={16} />
              Publish Now
            </>
          )}
        </button>
      </div>
    </div>
  )
}