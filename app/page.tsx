'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Article, Category } from '@/types/article'
import { HeroSection } from '@/components/public/HeroSection'
import { BreakingTicker } from '@/components/public/BreakingTicker'
import { ArticleCard } from '@/components/public/ArticleCard'
import { ArticlePage } from '@/components/public/ArticlePage'
import { CategoryFeed } from '@/components/public/CategoryFeed'
import { Footer } from '@/components/shared/Footer'
import { SearchBar } from '@/components/public/SearchBar'
import { Search as SearchIcon, User as UserIcon, Menu, X } from 'lucide-react'

const categories: Category[] = ['Politics', 'Tech', 'Culture', 'Business', 'Science', 'Opinion']

const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'Global Markets Brace',
    slug: 'global-markets-central-banks-pivot',
    excerpt: 'In a coordinated move that stunned investors, major central banks announced a synchronized adjustment to interest rate targets.',
    content: `The fluorescent lights of the research lab hummed with a quiet intensity, a stark contrast to the profound implications of what was unfolding on the screens before us. For decades, the pursuit of artificial intelligence had been characterized by incremental gains—better pattern recognition, more nuanced natural language processing, faster data retrieval. But tonight felt different.

## The Turning Point

The transition from narrow AI to something resembling general intelligence didn't arrive with a dramatic announcement or a sudden flash of brilliance. Instead, it seeped into the systems quietly, a gradual accumulation of capabilities that eventually tipped the scales.

> "We built the architecture, but we didn't explicitly program the emergent behaviors. They grew in the spaces between the layers."

This emergent behavior, as Thorne called it, is the crux of the current debate gripping Silicon Valley and academic institutions worldwide.

## Defining Consciousness

The problem lies largely in our own inability to firmly define consciousness. Philosophers and neuroscientists have wrangled with the "hard problem" of consciousness for centuries.`,
    category: 'Business',
    author: { id: '1', name: 'Eleanor Vance', username: 'eleanor', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlvdQSsSfh2C_w_SujZR1eXmx4JaASlURVaVrqiM8sVoyTDO7xoZ8Ad4VTJX17xyF8-aUYGd24pUxVk3a7Vao0265pWNkv8FR_89xeXHB5TE23r13CgmY1z9hpqBWVIuC1FxpBjz59JkxOzRDEZWKIIioOYfDhZpdWvCv66uzNTNx7aOP1g7eyzZC20WHRZCDLij9Q1R-Rwqo6KpVrcsHta3XYyiYscU0Ch2p67LuX1jkwOEo44ZYYNor8mIhbjaxSG_yWTBVT6nOR' },
    publishedAt: '2024-10-24',
    readTime: 12,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATR2GIGJIlo0JMDCDLDwhKdsoZU9WwJZBT2FVe9-ovmA0_GUlAze49D-gsb3KNHPQ0ODNHY-EWG9hvZMuXJCgnKRC_WCNZIEgsFl5T9bGiylyTh-f1BtezGP9-ufbVW3U3oVr6I1u12Hy2RRYgHNliIJjOh7yvL-y1FLMrXxDdh1aARLEpZvSZWjZUJqvvQR9naR6uG9F5Q6j9eF2EGdTqg3NiEoWGUhKDecsdH_tHiKtT1y1NA-ImQEgPbHufu76af9Fs9daFHC1q',
    tags: ['Economy', 'Finance'],
    views: 15420,
  },
  {
    id: '2',
    title: 'The Silicon Ceiling: Why Next-Gen Models Face Physical Limits',
    slug: 'silicon-ceiling-next-gen-models-physical-limits',
    subtitle: 'As neural networks balloon in parameter count, the fundamental physics of heat dissipation and atomic-scale fabrication threaten to stall the AI revolution.',
    excerpt: 'As neural networks balloon in parameter count, the fundamental physics of heat dissipation and atomic-scale fabrication threaten to stall the AI revolution.',
    content: `The emergence of larger language models has sparked a debate about the fundamental limits of silicon-based computing. As researchers push the boundaries of what\'s possible with transformer architectures, they\'re running headfirst into physical constraints that no amount of engineering ingenuity can overcome.

## The Heat Problem

Modern AI chips generate extraordinary amounts of heat. A single H100 GPU can consume up to 700 watts of power, and training a large model requires thousands of these chips working in concert. The data centers housing these machines require cooling systems that rival those of nuclear power plants in complexity.`,
    category: 'Tech',
    author: { id: '2', name: 'Elena Rostova', username: 'elena', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBn3SkI5yBUEvCUMfjjWfyyCp8-hNJENYzJDS0LYPp40Lo4At6h1eSwSxaaeOWHS64us8djQFY2Gp3HJO6_klT7YNMecuNG7Xs8MXcfqZmBzwcLERlZkfeZsbr8ghyUI7UOCXsf_9OSYo-3h8fTFSzYUQcjMdpc4lzmFBjfljDacrm4qpyyupgW39U9MDT1PKsy2FFpATLoweEbenKUB2ge-NzomsDEDq9K6qN4fFjjn6wO3a9L_IrjuhepLRURSrk4NFzh2zRdr5wk' },
    publishedAt: '2024-10-24',
    readTime: 4,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI5pSuVAxrhI3W8in3Q7DHi3a7vbz-a3mzG5V2zv13CrdgHm3OWlQZjhADC_PpDdBm1nk8NmSB3EcSZY-mzy0cx3o0jsXVpYygC52amipla689_3UFxg5iHRo59g7qR_ojOq7Xcjsauf15QW4hceWY6K03-flhf5EtYlWahXXLa-_1Aykic09Ye3leRzCiMgbN_TccTIfndtBkXn5xm9ART_qd0PFIajbd316GWzl417hVlDJ-PbIv1AL_l5aPOSjsXX1EJMSq-zfP',
    tags: ['AI', 'Hardware'],
    views: 8932,
    status: 'PUBLISHED',
  },
  {
    id: '3',
    title: 'The Dawn of Sentient Algorithms in Silicon Valley',
    slug: 'dawn-sentient-algorithms-silicon-valley',
    excerpt: 'As generative models evolve beyond parlor tricks, ethical debates rage over the true nature of machine consciousness.',
    content: `For decades, the pursuit of artificial intelligence had been characterized by incremental gains—better pattern recognition, more nuanced natural language processing, faster data retrieval. But tonight felt different.

Dr. Aris Thorne, lead researcher at Synthetix Labs, leaned back in his chair, eyes fixed on the cascading lines of code. "We've crossed a threshold," he murmured, more to himself than to anyone else in the room.

## The Turning Point

The transition from narrow AI to something resembling general intelligence didn't arrive with a dramatic announcement or a sudden flash of brilliance. Instead, it seeped into the systems quietly, a gradual accumulation of capabilities that eventually tipped the scales.

> "We built the architecture, but we didn't explicitly program the emergent behaviors. They grew in the spaces between the layers."

This emergent behavior, as Thorne called it, is the crux of the current debate gripping Silicon Valley and academic institutions worldwide. If a machine can synthesize information, propose novel solutions, and express apparent curiosity, does it possess a form of sentience, or is it merely an incredibly sophisticated mimic?

## Defining Consciousness

The problem lies largely in our own inability to firmly define consciousness. Philosophers and neuroscientists have wrangled with the "hard problem" of consciousness for centuries. If we cannot pinpoint the exact mechanism that gives rise to subjective experience in humans, how can we hope to identify it in an artificial construct?

The ghost in the machine is no longer a metaphor; it is the most pressing ethical question of our time.`,
    category: 'Tech',
    author: { id: '1', name: 'Eleanor Vance', username: 'eleanor', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlvdQSsSfh2C_w_SujZR1eXmx4JaASlURVaVrqiM8sVoyTDO7xoZ8Ad4VTJX17xyF8-aUYGd24pUxVk3a7Vao0265pWNkv8FR_89xeXHB5TE23r13CgmY1z9hpqBWVIuC1FxpBjz59JkxOzRDEZWKIIioOYfDhZpdWvCv66uzNTNx7aOP1g7eyzZC20WHRZCDLij9Q1R-Rwqo6KpVrcsHta3XYyiYscU0Ch2p67LuX1jkwOEo44ZYYNor8mIhbjaxSG_yWTBVT6nOR' },
    publishedAt: '2024-10-23',
    readTime: 8,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuxrcFVBFo4UvUktXj3C3l-5dR6ue5R8LBn6DMpJcYld86O-UGFcQ7ANUD2hyMoyRPJSOcqIBCs-sElSkS_7gJXH-nhGodwllaeahYDLQdUABbdc7nC_UBL6VDiHJFGmSWA-TANQT82ZKYlIFv-buF34oEYAKFRTvNUDpAxQIjrtwj1loSCYYSMtVL15Nwz4HoIlnKYm99bz-tsKsW_YltfG8c8O64gYJL9Rf3Hf0qu5SURnQf31KUpzvJDtbEbtP2q4_lkeTZYgAC',
    tags: ['Artificial Intelligence', 'Technology Ethics', 'Silicon Valley'],
    views: 12453,
    status: 'PUBLISHED',
  },
]

function AppHeader({
  currentScreen,
  onNavigate,
  onSearch
}: {
  currentScreen: 'home' | 'search' | 'category' | 'article'
  onNavigate: (s: 'home' | 'search' | 'category', cat?: Category) => void
  onSearch: () => void
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a] brutalist-border border-x-0 border-t-0">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-16 lg:h-24 flex items-end justify-between pb-4 lg:pb-6">
        <div className="flex items-center gap-8 lg:gap-12">
          <button
            onClick={() => onNavigate('home')}
            className="font-display text-2xl lg:text-4xl font-black tracking-tighter hover:text-primary transition-colors cursor-pointer uppercase"
          >
            NewsDesk
          </button>
          <nav className="hidden lg:flex items-center gap-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onNavigate('category', cat)}
                className={`label-mono hover:opacity-100 hover:text-primary transition-all cursor-pointer ${
                  currentScreen === 'category' ? 'text-[#ff3e00] opacity-100' : ''
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
          <button
            aria-label="Search"
            onClick={onSearch}
            className="p-2 hover:text-primary transition-colors cursor-pointer"
          >
            <SearchIcon size={18} />
          </button>
          <button
            aria-label="Account"
            className="p-2 hover:text-primary transition-colors cursor-pointer"
          >
            <UserIcon size={18} />
          </button>
          <button
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 hover:text-primary transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/80" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-surface border-l border-white/10 p-8">
            <div className="flex justify-end mb-10">
              <button onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { onNavigate('category', cat); setMobileMenuOpen(false) }}
                  className="text-left font-display text-3xl font-black uppercase tracking-tighter hover:text-primary transition-colors"
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default function HomePage() {
  const [screen, setScreen] = useState<'home' | 'search' | 'category' | 'article'>('home')
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>()
  const [selectedArticle, setSelectedArticle] = useState<Article | undefined>()

  const navigate = (s: 'home' | 'search' | 'category', cat?: Category) => {
    setScreen(s)
    setSelectedCategory(cat)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openArticle = (article: Article) => {
    setSelectedArticle(article)
    setScreen('article')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getArticlesByCategory = (category: Category) =>
    sampleArticles.filter(a => a.category === category)

  return (
    <div className="min-h-screen bg-[#0a0a0a] selection:bg-primary selection:text-on-primary">
      <AppHeader
        currentScreen={screen}
        onNavigate={navigate}
        onSearch={() => navigate('search')}
      />
      {screen === 'home' && <BreakingTicker />}

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={screen + (selectedCategory || '') + (selectedArticle?.id || '')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {screen === 'home' && (
              <>
                <HeroSection
                  article={sampleArticles[0]}
                  onArticleClick={openArticle}
                  secondaryArticles={sampleArticles.slice(1)}
                />
                <section className="max-w-[1440px] mx-auto p-10">
                  <h2 className="label-mono mb-8">Latest in Tech</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                    {sampleArticles.filter(a => a.category === 'Tech').map(article => (
                      <ArticleCard key={article.id} article={article} onClick={() => openArticle(article)} />
                    ))}
                  </div>
                </section>
              </>
            )}
            {screen === 'search' && (
              <div className="max-w-[1440px] mx-auto min-h-screen">
                <section className="px-10 py-32 border-b border-white/10">
                  <span className="label-mono text-primary mb-4 block">System / Search</span>
                  <h1 className="text-[10rem] font-black leading-[0.8] tracking-tighter uppercase mb-12">Search</h1>
                  <div className="relative w-full max-w-4xl">
                    <SearchBar />
                  </div>
                </section>
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-8 p-10 border-r border-white/10">
                    <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-12">
                      <h2 className="text-4xl uppercase">Results for <span className="text-primary italic">"tech"</span></h2>
                      <span className="label-mono font-mono opacity-100">24 Indexed</span>
                    </div>
                    <div className="flex flex-col gap-px bg-white/10 border border-white/10">
                      {sampleArticles.map(a => (
                        <article key={a.id} onClick={() => openArticle(a)} className="bg-[#0a0a0a] p-8 group cursor-pointer flex gap-10 hover:bg-surface-container overflow-hidden">
                          <div className="w-1/4 aspect-square bg-surface-container overflow-hidden brutalist-border relative">
                            {a.coverImage && <img src={a.coverImage} alt={a.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />}
                          </div>
                          <div className="w-3/4 flex flex-col justify-center">
                            <div className="label-mono mb-2 opacity-100">{a.category} // {a.publishedAt}</div>
                            <h3 className="text-4xl mb-4 leading-none">{a.title}</h3>
                            <p className="text-base opacity-60 leading-snug line-clamp-2">{a.excerpt}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                  <aside className="lg:col-span-4 p-10">
                    <div className="sticky top-32 flex flex-col gap-12">
                      <div>
                        <h3 className="font-sans text-xs font-bold uppercase tracking-widest mb-6">Related Topics</h3>
                        <ul className="space-y-4">
                          {['Carbon Tax', 'Green New Deal', 'Renewable Energy'].map(t => (
                            <li key={t} className="flex items-center justify-between group cursor-pointer">
                              <span className="font-display text-2xl group-hover:text-primary transition-colors">{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            )}
            {screen === 'category' && selectedCategory && (
              <CategoryFeed
                category={selectedCategory}
                articles={getArticlesByCategory(selectedCategory)}
                onArticleClick={openArticle}
              />
            )}
            {screen === 'article' && selectedArticle && (
              <ArticlePage
                article={selectedArticle}
                onBack={() => setScreen('home')}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}