'use client'

import { Article } from '@/types/article'
import Image from 'next/image'
import { Bolt, ArrowRight } from 'lucide-react'

interface HeroSectionProps {
  article: Article
  onArticleClick: (article: Article) => void
  secondaryArticles?: Article[]
}

export function HeroSection({ article, onArticleClick, secondaryArticles = [] }: HeroSectionProps) {
  return (
    <div className="max-w-[1440px] mx-auto min-h-[80vh] lg:min-h-screen flex flex-col">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-gutter border-b border-white/10">
        <article
          onClick={() => onArticleClick(article)}
          className="md:col-span-8 p-6 lg:p-10 flex flex-col relative group cursor-pointer md:border-r border-white/10"
        >
          <span className="text-primary text-xs lg:text-sm font-mono mb-6 lg:mb-8 uppercase tracking-tighter flex items-center gap-2">
            <Bolt size={14} /> Breaking / {article.category}
          </span>
          <h1 className="text-[4rem] sm:text-[6rem] lg:text-[10rem] font-black leading-[0.85] mb-8 lg:mb-12 group-hover:text-primary transition-colors">
            {article.title.split(' ').slice(0, 2).join(' ')}<br />
            {article.title.split(' ').slice(2).join(' ')}
          </h1>

          <div className="mt-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-end">
            {article.excerpt && (
              <p className="text-base lg:text-xl leading-snug opacity-70">{article.excerpt}</p>
            )}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between brutalist-border p-3 lg:p-4 hover-invert">
                <span className="label-mono opacity-100">Read Time</span>
                <span className="font-mono text-sm">{article.readTime || 5} Min</span>
              </div>
              <div className="flex justify-between brutalist-border p-3 lg:p-4 hover-invert">
                <span className="label-mono opacity-100">Author</span>
                <span className="font-mono text-sm">{article.author.name}</span>
              </div>
            </div>
          </div>
        </article>

        <div className="md:col-span-4 flex flex-col">
          {secondaryArticles.slice(0, 2).map((sec) => (
            <div
              key={sec.id}
              onClick={() => onArticleClick(sec)}
              className="p-6 lg:p-10 border-b border-white/10 flex-1 hover-invert group cursor-pointer"
            >
              <span className="label-mono mb-3 lg:mb-4 block">{sec.category}</span>
              <h2 className="text-2xl lg:text-4xl mb-4 lg:mb-6 leading-none group-hover:text-primary transition-colors">
                {sec.title.length > 50 ? sec.title.slice(0, 50) + '...' : sec.title}
              </h2>
              {sec.excerpt && (
                <p className="text-xs lg:text-sm opacity-60 leading-relaxed line-clamp-2">{sec.excerpt}</p>
              )}
            </div>
          ))}
          <div className="p-6 lg:p-10 bg-primary text-on-primary flex-1 group cursor-pointer overflow-hidden relative">
            <span className="label-mono opacity-100 mb-4 block">Current Edition</span>
            <h3 className="text-3xl lg:text-5xl leading-none italic font-serif">Visual Logic</h3>
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
              <Bolt size={120} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}