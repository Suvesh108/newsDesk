export const ENRICH_PROMPT = `You are an expert SEO analyst and content strategist. Analyze the following article and provide comprehensive SEO metadata.

Article Title: {title}
Category: {category}
Content: {content}

Respond ONLY with valid JSON (no markdown, no explanation):
{
  "metaTitle": "SEO optimized title under 60 characters, keyword-first",
  "metaDescription": "Action-oriented description under 155 characters",
  "slug": "kebab-case-seo-friendly-url",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "excerpt": "2-sentence compelling summary",
  "readTime": number (estimated reading minutes),
  "jsonLd": {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "article headline",
    "image": ["image url"],
    "datePublished": "ISO date",
    "dateModified": "ISO date",
    "author": { "@type": "Person", "name": "author name" },
    "publisher": { "@type": "Organization", "name": "NewsDesk" }
  }
}`