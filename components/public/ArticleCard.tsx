'use client'

import { Article } from '@/types/article'
import Image from 'next/image'
import { ArrowRight, Clock, Bolt } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface ArticleCardProps {
  article: Article
  variant?: 'default' | 'featured' | 'compact'
  onClick?: () => void
}

export function ArticleCard({ article, variant = 'default', onClick }: ArticleCardProps) {
  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })

  if (variant === 'compact') {
    return (
      <article
        onClick={onClick}
        className="group cursor-pointer flex flex-col border border-white/10 p-4 hover:bg-surface-container transition-colors"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="label-mono opacity-100 bg-primary text-black px-2 py-0.5">{article.category}</span>
          <span className="label-mono text-[8px]">{timeAgo}</span>
        </div>
        <h3 className="text-2xl mb-3 leading-tight group-hover:text-primary transition-colors">{article.title}</h3>
        <div className="mt-auto flex justify-between items-end">
          <span className="text-sm opacity-60">{article.author.name}</span>
          <span className="text-xl opacity-60 group-hover:opacity-100">→</span>
        </div>
      </article>
    )
  }

  if (variant === 'featured') {
    return (
      <article
        onClick={onClick}
        className="group cursor-pointer flex flex-col border border-white/10"
      >
        {article.coverImage && (
          <div className="aspect-[16/9] w-full overflow-hidden relative">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-4">
            <Bolt size={14} className="text-primary" />
            <span className="label-mono opacity-100">{article.category}</span>
          </div>
          <h2 className="text-4xl mb-6 group-hover:text-primary transition-colors leading-tight">{article.title}</h2>
          {article.excerpt && (
            <p className="text-lg opacity-70 mb-6 line-clamp-3">{article.excerpt}</p>
          )}
          <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
            <span className="label-mono opacity-100">{article.author.name}</span>
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </article>
    )
  }

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer flex flex-col border border-white/10"
    >
      {article.coverImage && (
        <div className="aspect-[16/9] w-full overflow-hidden relative">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <span className="label-mono opacity-100 bg-primary text-black px-2 py-0.5">{article.category}</span>
          {article.readTime && (
            <span className="label-mono flex items-center gap-1">
              <Clock size={10} /> {article.readTime} min
            </span>
          )}
        </div>
        <h3 className="text-3xl mb-4 group-hover:text-primary transition-colors leading-tight">{article.title}</h3>
        {article.excerpt && (
          <p className="text-base opacity-60 line-clamp-2 mb-4">{article.excerpt}</p>
        )}
        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
          <span className="label-mono text-[10px]">{timeAgo}</span>
          <span className="text-lg opacity-60 group-hover:opacity-100">→</span>
        </div>
      </div>
    </article>
  )
}