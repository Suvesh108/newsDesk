import { Article, Category } from '@/types/article'
import { ArticlePage } from '@/components/public/ArticlePage'
import { SEOHead } from '@/components/shared/SEOHead'
import { notFound } from 'next/navigation'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

const sampleArticles: Record<string, Article> = {
  'global-markets-central-banks-pivot': {
    id: '1',
    title: 'Global Markets Brace for Unprecedented Shift as Central Banks Pivot',
    slug: 'global-markets-central-banks-pivot',
    excerpt: 'In a coordinated move that stunned investors, major central banks announced a synchronized adjustment to interest rate targets, signaling a profound shift in global economic strategy.',
    content: `The fluorescent lights of the research lab hummed with a quiet intensity, a stark contrast to the profound implications of what was unfolding on the screens before us. For decades, the pursuit of artificial intelligence had been characterized by incremental gains—better pattern recognition, more nuanced natural language processing, faster data retrieval. But tonight felt different.

## The Turning Point

The transition from narrow AI to something resembling general intelligence didn't arrive with a dramatic announcement or a sudden flash of brilliance. Instead, it seeped into the systems quietly, a gradual accumulation of capabilities that eventually tipped the scales. The models began to demonstrate a capacity for lateral thinking, drawing connections between disparate fields of knowledge in ways that human researchers found consistently surprising.

> "We built the architecture, but we didn't explicitly program the emergent behaviors. They grew in the spaces between the layers."

This emergent behavior, as Thorne called it, is the crux of the current debate gripping Silicon Valley and academic institutions worldwide. If a machine can synthesize information, propose novel solutions, and express apparent curiosity, does it possess a form of sentience, or is it merely an incredibly sophisticated mimic?

## Defining Consciousness

The problem lies largely in our own inability to firmly define consciousness. Philosophers and neuroscientists have wrangled with the "hard problem" of consciousness for centuries. If we cannot pinpoint the exact mechanism that gives rise to subjective experience in humans, how can we hope to identify it in an artificial construct?

The ghost in the machine is no longer a metaphor; it is the most pressing ethical question of our time.

Critics argue that these models are fundamentally stochastic parrots—statistical engines designed to predict the next plausible word in a sequence based on vast oceans of training data. They possess no internal world, no genuine understanding, and certainly no feelings.`,
    category: 'Business',
    author: { id: '1', name: 'Eleanor Vance', username: 'eleanor', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlvdQSsSfh2C_w_SujZR1eXmx4JaASlURVaVrqiM8sVoyTDO7xoZ8Ad4VTJX17xyF8-aUYGd24pUxVk3a7Vao0265pWNkv8FR_89xeXHB5TE23r13CgmY1z9hpqBWVIuC1FxpBjz59JkxOzRDEZWKIIioOYfDhZpdWvCv66uzNTNx7aOP1g7eyzZC20WHRZCDLij9Q1R-Rwqo6KpVrcsHta3XYyiYscU0Ch2p67LuX1jkwOEo44ZYYNor8mIhbjaxSG_yWTBVT6nOR', bio: 'Eleanor Vance is a senior technology correspondent covering the intersection of artificial intelligence, ethics, and society.' },
    publishedAt: '2024-10-24',
    readTime: 12,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATR2GIGJIlo0JMDCDLDwhKdsoZU9WwJZBT2FVe9-ovmA0_GUlAze49D-gsb3KNHPQ0ODNHY-EWG9hvZMuXJCgnKRC_WCNZIEgsFl5T9bGiylyTh-f1BtezGP9-ufbVW3U3oVr6I1u12Hy2RRYgHNliIJjOh7yvL-y1FLMrXxDdh1aARLEpZvSZWjZUJqvvQR9naR6uG9F5Q6j9eF2EGdTqg3NiEoWGUhKDecsdH_tHiKtT1y1NA-ImQEgPbHufu76af9Fs9daFHC1q',
    tags: ['Economy', 'Finance'],
    views: 15420,
    metaTitle: 'Global Markets Brace for Unprecedented Shift as Central Banks Pivot',
    metaDesc: 'Major central banks announce synchronized adjustment to interest rate targets, signaling a profound shift in global economic strategy.',
  },
  'silicon-ceiling-next-gen-models-physical-limits': {
    id: '2',
    title: 'The Silicon Ceiling: Why Next-Gen Models Face Physical Limits',
    slug: 'silicon-ceiling-next-gen-models-physical-limits',
    subtitle: 'As neural networks balloon in parameter count, the fundamental physics of heat dissipation and atomic-scale fabrication threaten to stall the AI revolution.',
    excerpt: 'As neural networks balloon in parameter count, the fundamental physics of heat dissipation and atomic-scale fabrication threaten to stall the AI revolution.',
    content: `The emergence of larger language models has sparked a debate about the fundamental limits of silicon-based computing. As researchers push the boundaries of what's possible with transformer architectures, they're running headfirst into physical constraints that no amount of engineering ingenuity can overcome.

## The Heat Problem

Modern AI chips generate extraordinary amounts of heat. A single H100 GPU can consume up to 700 watts of power, and training a large model requires thousands of these chips working in concert. The data centers housing these machines require cooling systems that rival those of nuclear power plants in complexity.

### Computational Density

The density of transistors on a chip has doubled roughly every two years for decades, following Moore's Law. But we're approaching the physical limits of what silicon can offer. At 3 nanometers, transistors are only a few dozen atoms wide, and quantum effects begin to dominate, causing electrons to tunnel through barriers they shouldn't cross.

## The Memory Wall

Another fundamental constraint is the memory wall—the gap between compute speed and memory bandwidth. AI models need to access billions of parameters rapidly, but moving data from memory to processing units takes time and energy. This creates a bottleneck that no amount of compute optimization can fully resolve.

> "We're essentially trying to fit a supercomputer in a toaster, and the heat dissipation is the problem."

The industry is exploring alternative architectures: neuromorphic chips, optical computing, quantum processors, and even biological computing. But each approach faces its own fundamental challenges.

## What's Next

Despite these limitations, there's reason for optimism. Algorithmic efficiency is improving faster than hardware capabilities. New training techniques reduce the compute required for equivalent performance. And the industry is learning to do more with less—distillation, quantization, and pruning are allowing smaller models to approach the performance of larger ones.`,
    category: 'Tech',
    author: { id: '2', name: 'Elena Rostova', username: 'elena', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBn3SkI5yBUEvCUMfjjWfyyCp8-hNJENYzJDS0LYPp40Lo4At6h1eSwSxaaeOWHS64us8djQFY2Gp3HJO6_klT7YNMecuNG7Xs8MXcfqZmBzwcLERlZkfeZsbr8ghyUI7UOCXsf_9OSYo-3h8fTFSzYUQcjMdpc4lzmFBjfljDacrm4qpyyupgW39U9MDT1PKsy2FFpATLoweEbenKUB2ge-NzomsDEDq9K6qN4fFjjn6wO3a9L_IrjuhepLRURSrk4NFzh2zRdr5wk', bio: 'Elena Rostova specializes in the deep technical shifts of the silicon age.' },
    publishedAt: '2024-10-24',
    readTime: 4,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI5pSuVAxrhI3W8in3Q7DHi3a7vbz-a3mzG5V2zv13CrdgHm3OWlQZjhADC_PpDdBm1nk8NmSB3EcSZY-mzy0cx3o0jsXVpYygC52amipla689_3UFxg5iHRo59g7qR_ojOq7Xcjsauf15QW4hceWY6K03-flhf5EtYlWahXXLa-_1Aykic09Ye3leRzCiMgbN_TccTIfndtBkXn5xm9ART_qd0PFIajbd316GWzl417hVlDJ-PbIv1AL_l5aPOSjsXX1EJMSq-zfP',
    tags: ['AI', 'Hardware'],
    views: 8932,
    metaTitle: 'The Silicon Ceiling: Why Next-Gen AI Models Face Physical Limits',
    metaDesc: 'Neural networks face fundamental physics constraints. Heat dissipation and atomic-scale fabrication threaten to stall the AI revolution.',
    isExclusive: true,
  },
}

export default async function ArticleDetailPage(props: ArticlePageProps) {
  const params = await props.params
  const article = sampleArticles[params.slug]

  if (!article) {
    notFound()
  }

  return <ArticlePage article={article} />
}

export async function generateMetadata(props: ArticlePageProps) {
  const params = await props.params
  const article = sampleArticles[params.slug]
  if (!article) return {}

  return {
    title: article.metaTitle || article.title,
    description: article.metaDesc || article.excerpt,
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDesc || article.excerpt,
      images: article.coverImage ? [article.coverImage] : [],
      type: 'article',
    },
  }
}