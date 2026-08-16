'use client'

import { Article } from '@/types/article'
import Image from 'next/image'
import { SEOHead } from '@/components/shared/SEOHead'
import { AuthorAvatar } from '@/components/shared/AuthorAvatar'
import { TagBadge } from '@/components/shared/TagBadge'
import { Bookmark, Share2, Printer, ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'

interface ArticlePageProps {
  article: Article
  onBack?: () => void
}

export function ArticlePage({ article, onBack }: ArticlePageProps) {
  const publishDate = format(new Date(article.publishedAt), 'MMMM d, yyyy')
  const jsonLd = article.jsonLd || {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    image: article.coverImage ? [article.coverImage] : [],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { '@type': 'Person', name: article.author.name },
    publisher: { '@type': 'Organization', name: 'NewsDesk' },
  }

  return (
    <>
      <SEOHead
        title={article.metaTitle || article.title}
        description={article.metaDesc || article.excerpt}
        image={article.ogImage || article.coverImage}
        article={article}
        jsonLd={jsonLd}
      />

      <article className="max-w-[1440px] mx-auto min-h-screen">
        <header className="px-6 lg:px-10 py-12 lg:py-20 border-b border-white/10">
          <div className="max-w-5xl">
            <button
              onClick={onBack}
              className="flex items-center gap-2 label-mono hover:text-primary transition-colors mb-6 lg:mb-8 cursor-pointer"
            >
              <ArrowLeft size={14} /> Back
            </button>

            <div className="label-mono text-primary mb-6 lg:mb-8 block">
              {article.category} / {article.tags[0] || 'Latest'}
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-[8rem] font-black leading-[0.85] tracking-tighter uppercase mb-8 lg:mb-12">
              {article.title}
            </h1>
            {article.subtitle && (
              <p className="text-xl lg:text-3xl font-medium leading-tight opacity-70 mb-8 lg:mb-12 max-w-3xl">
                {article.subtitle}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 py-8 lg:py-10 border-t border-white/10">
              <div className="flex flex-col gap-1">
                <span className="label-mono">Author</span>
                <span className="font-display font-bold uppercase text-base lg:text-lg">{article.author.name}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="label-mono">Date</span>
                <span className="font-mono text-xs lg:text-sm">{publishDate}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="label-mono">Indexing</span>
                <span className="font-mono text-xs lg:text-sm">Vol. 04 / POS.{article.id}</span>
              </div>
            </div>
          </div>
        </header>

        {article.coverImage && (
          <figure className="w-full grayscale hover:grayscale-0 transition-all duration-700">
            <Image
              src={article.coverImage}
              alt={article.title}
              width={1440}
              height={700}
              className="w-full h-[70vh] object-cover"
              priority
            />
          </figure>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter px-6 lg:px-10 py-12 lg:py-20">
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 flex flex-col gap-12">
              <div className="flex flex-col gap-4">
                <span className="label-mono opacity-100">Perspective</span>
                <p className="text-xs opacity-50 leading-relaxed font-mono">
                  Exploring the raw intersection of systematic thinking and expressive editorial logic.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <button className="flex items-center justify-between brutalist-border p-4 hover-invert label-mono opacity-100 cursor-pointer">
                  Save <Bookmark size={14} />
                </button>
                <button className="flex items-center justify-between brutalist-border p-4 hover-invert label-mono opacity-100 cursor-pointer">
                  Share <Share2 size={14} />
                </button>
                <button className="flex items-center justify-between brutalist-border p-4 hover-invert label-mono opacity-100 cursor-pointer">
                  Print <Printer size={14} />
                </button>
              </div>
            </div>
          </aside>

          <div className="col-span-12 lg:col-span-6 lg:col-start-4">
            <div className="prose-brutalist article-content">
              {article.content.includes('<') ? (
                <div className="article-html" dangerouslySetInnerHTML={{ __html: article.content }} />
              ) : (
                article.content.split('\n\n').map((p, i) => {
                  if (p.startsWith('## ')) return <h2 key={i} className="text-3xl lg:text-5xl text-primary mt-12 lg:mt-16 mb-6 lg:mb-8">{p.replace('## ', '')}</h2>
                  if (p.startsWith('> ')) return <blockquote key={i} className="my-12 lg:my-16 pl-6 lg:pl-10 border-l-8 border-primary font-display text-2xl lg:text-4xl leading-tight uppercase font-black">{p.replace('> ', '')}</blockquote>
                  return <p key={i} className="mb-6 lg:mb-10 text-lg lg:text-xl leading-relaxed opacity-80">{p}</p>
                })
              )}
            </div>
            <style>{`
              .article-html h2 { font-size: 3rem; color: #ff3e00; margin-top: 4rem; margin-bottom: 2rem; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; }
              .article-html h3 { font-size: 1.875rem; margin-top: 3rem; margin-bottom: 1.5rem; font-weight: 900; text-transform: uppercase; }
              .article-html p { margin-bottom: 2.5rem; font-size: 1.25rem; line-height: 1.625; opacity: 0.8; }
              .article-html blockquote { margin: 4rem 0; padding-left: 2.5rem; border-left: 8px solid #ff3e00; font-family: 'Space Grotesk', sans-serif; font-size: 2.25rem; line-height: 1.1; text-transform: uppercase; font-weight: 900; }
              .article-html img { max-width: 100%; height: auto; margin: 2rem 0; }
              .article-html a { color: #ff3e00; text-decoration: underline; }
              @media (max-width: 768px) {
                .article-html h2 { font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem; }
                .article-html p { font-size: 1rem; margin-bottom: 1.5rem; }
                .article-html blockquote { font-size: 1.5rem; padding-left: 1.5rem; margin: 2rem 0; }
              }
            `}</style>

            <div className="mt-24 flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>

            <div className="mt-24 p-10 bg-primary text-black flex flex-col md:flex-row gap-10 items-center md:items-start group">
              <AuthorAvatar author={article.author} size={160} className="border-4 border-black" />
              <div className="flex flex-col justify-between py-2 text-center md:text-left">
                <div>
                  <h3 className="text-4xl font-black mb-2 text-black">{article.author.name}</h3>
                  {article.author.bio && (
                    <p className="text-sm font-medium leading-tight opacity-70 mb-4">
                      {article.author.bio.split('.')[0]}.
                    </p>
                  )}
                </div>
                <a href={`/author/${article.author.username}`} className="self-center md:self-start border-2 border-black px-6 py-2 font-mono text-xs uppercase font-black hover:bg-black hover:text-primary transition-colors">
                  Follow Source →
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}