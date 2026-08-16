'use client'

import { useState } from 'react'
import { Article, Category } from '@/types/article'
import { ArticleCard } from './ArticleCard'
import { Plus, TrendingUp, Mail } from 'lucide-react'

interface CategoryFeedProps {
  category: Category
  articles: Article[]
  onArticleClick: (article: Article) => void
}

export function CategoryFeed({ category, articles, onArticleClick }: CategoryFeedProps) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const leads = articles[0]
  const secondary = articles.slice(1, 3)
  const rest = articles.slice(3)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <div>
      <div className="border-b border-white/10 py-20 lg:py-32 px-6 lg:px-10 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto z-10">
          <span className="label-mono text-primary mb-4 block">Archive / System</span>
          <h1 className="text-[5rem] sm:text-[8rem] lg:text-[12rem] font-black leading-[0.8] tracking-tighter uppercase mb-4">{category}</h1>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-8 lg:border-r border-white/10 p-6 lg:p-10 flex flex-col gap-2">
          {articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 lg:py-32 text-center">
              <span className="label-mono text-primary mb-6 block">No articles found</span>
              <p className="font-display text-3xl lg:text-5xl font-black uppercase tracking-tighter max-w-md">
                Nothing indexed in {category} yet
              </p>
              <p className="font-mono text-sm opacity-50 mt-6">Check back later for new stories</p>
            </div>
          ) : (
            <>
              {leads && (
                <div onClick={() => onArticleClick(leads)}>
                  <ArticleCard article={leads} variant="featured" />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {secondary.map(a => (
                  <div key={a.id} className="h-full" onClick={() => onArticleClick(a)}>
                    <ArticleCard article={a} variant="compact" />
                  </div>
                ))}
              </div>

              {rest.map(a => (
                <div key={a.id} className="h-full" onClick={() => onArticleClick(a)}>
                  <ArticleCard article={a} />
                </div>
              ))}

              <button className="brutalist-border mt-10 p-6 lg:p-8 hover-invert label-mono opacity-100 flex items-center justify-between cursor-pointer">
                Fetch Further Data / Index <Plus size={16} />
              </button>
            </>
          )}
        </div>

        <aside className="lg:col-span-4 flex flex-col">
          <div className="p-6 lg:p-10 border-b border-white/10">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6 flex items-center gap-2">
              <TrendingUp size={14} /> Most Read in {category}
            </h3>
            {articles.length === 0 ? (
              <p className="font-mono text-xs opacity-50">No data available</p>
            ) : (
              <ol className="flex flex-col gap-6">
                {articles.slice(0, 4).map((a, i) => (
                  <li key={a.id} className="flex gap-4 group cursor-pointer">
                    <span className="font-display text-4xl text-on-surface-variant italic opacity-40">{i + 1}</span>
                    <div className="flex flex-col gap-2">
                      <h4 className="font-display text-lg leading-tight group-hover:text-primary transition-colors">
                        {a.title.length > 60 ? a.title.slice(0, 60) + '...' : a.title}
                      </h4>
                      <div className="h-px bg-white/10 w-full" />
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
          <div className="p-6 lg:p-10 bg-surface-container border border-primary relative group">
            <div className="absolute -top-3 -right-3 bg-primary text-on-primary p-2 group-hover:-translate-y-1 transition-transform">
              <Mail size={20} />
            </div>
            <h3 className="font-display text-2xl mb-2">The Wireframe</h3>
            <p className="font-serif text-sm text-on-surface-variant mb-6">
              A weekly dissection of the tech industry&apos;s moves, delivered straight to your inbox.
            </p>
            {subscribed ? (
              <div className="bg-green-500/20 text-green-400 p-4 font-mono text-xs uppercase text-center">
                Subscribed successfully!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <label className="font-sans text-[10px] text-on-surface-variant uppercase mb-1 block">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-brutalist w-full font-mono text-sm h-10 outline-none"
                    placeholder="you@domain.com"
                  />
                </div>
                <button type="submit" className="bg-primary text-on-primary w-full h-12 font-sans font-bold uppercase tracking-widest hover:-translate-y-1 transition-all">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}