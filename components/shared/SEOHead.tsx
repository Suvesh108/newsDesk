'use client'

import { Article } from '@/types/article'
import Head from 'next/head'

interface SEOHeadProps {
  title: string
  description?: string
  image?: string
  url?: string
  article?: Article
  jsonLd?: Record<string, unknown>
}

export function SEOHead({ title, description = 'NewsDesk editorial platform', image, url, article, jsonLd }: SEOHeadProps) {
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://newsdesk.com'
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl
  const ogImage = image || `${siteUrl}/og-default.png`

  const defaultJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NewsDesk',
    url: siteUrl,
  }

  const mergedJsonLd = jsonLd ? { ...defaultJsonLd, ...jsonLd } : defaultJsonLd

  const breadcrumbJsonLd = article ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: article.category, item: `${siteUrl}/${article.category.toLowerCase()}` },
      { '@type': 'ListItem', position: 3, name: article.title, item: fullUrl },
    ],
  } : null

  return (
    <Head>
      <title>{title} | NewsDesk</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:site_name" content="NewsDesk" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {article && (
        <>
          <meta property="article:published_time" content={article.publishedAt} />
          <meta property="article:author" content={article.author.name} />
          <meta property="article:section" content={article.category} />
          {article.tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mergedJsonLd) }}
      />
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}
    </Head>
  )
}