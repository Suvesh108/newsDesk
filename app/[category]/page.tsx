import { Category } from '@/types/article'
import { CategoryFeed } from '@/components/public/CategoryFeed'
import { SEOHead } from '@/components/shared/SEOHead'

interface CategoryPageProps {
  params: { category: string }
}

const categories: Category[] = ['Politics', 'Tech', 'Culture', 'Business', 'Science', 'Opinion']
const validCategorySlugs = categories.map(c => c.toLowerCase())

const categoryArticles: Record<string, any[]> = {
  politics: [
    {
      id: '4',
      title: 'Legislative Deadlock Broken in Historic Vote',
      slug: 'legislative-deadlock-broken-historic-vote',
      excerpt: 'Sweeping infrastructure bill passes with bipartisan support after months of negotiations.',
      content: 'Content here...',
      category: 'Politics',
      author: { id: '3', name: 'Marcus Chen', username: 'marcus', avatar: '' },
      publishedAt: '2024-10-22',
      readTime: 6,
      coverImage: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800',
      tags: ['Politics', 'Infrastructure'],
    },
  ],
  tech: [
    {
      id: '2',
      title: 'The Silicon Ceiling: Why Next-Gen Models Face Physical Limits',
      slug: 'silicon-ceiling-next-gen-models-physical-limits',
      excerpt: 'As neural networks balloon in parameter count, the fundamental physics threaten to stall the AI revolution.',
      content: 'Content here...',
      category: 'Tech',
      author: { id: '2', name: 'Elena Rostova', username: 'elena', avatar: '' },
      publishedAt: '2024-10-24',
      readTime: 4,
      coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
      tags: ['AI', 'Hardware'],
    },
  ],
  culture: [],
  business: [
    {
      id: '1',
      title: 'Global Markets Brace for Unprecedented Shift',
      slug: 'global-markets-central-banks-pivot',
      excerpt: 'Major central banks announce synchronized adjustment to interest rate targets.',
      content: 'Content here...',
      category: 'Business',
      author: { id: '1', name: 'Eleanor Vance', username: 'eleanor', avatar: '' },
      publishedAt: '2024-10-24',
      readTime: 12,
      coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
      tags: ['Economy', 'Finance'],
    },
  ],
  science: [],
  opinion: [],
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.category.toLowerCase()
  const category = categories.find(c => c.toLowerCase() === categorySlug)

  if (!category || !validCategorySlugs.includes(categorySlug)) {
    return <div>Category not found</div>
  }

  const articles = categoryArticles[categorySlug] || []

  return (
    <>
      <SEOHead
        title={`${category} News`}
        description={`Latest ${category.toLowerCase()} news and updates from NewsDesk.`}
      />
      <CategoryFeed category={category} articles={articles} onArticleClick={() => {}} />
    </>
  )
}

export function generateMetadata({ params }: CategoryPageProps) {
  const categorySlug = params.category.toLowerCase()
  const category = categories.find(c => c.toLowerCase() === categorySlug)

  return {
    title: `${category || 'Category'} | NewsDesk`,
    description: `Latest ${categorySlug} news and updates from NewsDesk.`,
  }
}