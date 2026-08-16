'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { SearchBar } from '@/components/public/SearchBar'
import { Article } from '@/types/article'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams?.get('q') || ''

  return (
    <div className="max-w-[1440px] mx-auto min-h-screen">
      <section className="px-6 lg:px-10 py-20 lg:py-32 border-b border-white/10">
        <span className="label-mono text-primary mb-4 block">System / Search</span>
        <h1 className="text-[5rem] sm:text-[8rem] lg:text-[10rem] font-black leading-[0.8] tracking-tighter uppercase mb-8 lg:mb-12">Search</h1>
        <div className="relative w-full max-w-4xl">
          <SearchBar />
        </div>
      </section>

      {query && (
        <section className="px-6 lg:px-10 py-12 lg:py-20">
          <div className="flex items-end justify-between border-b border-white/10 pb-6 mb-10">
            <h2 className="text-2xl lg:text-4xl uppercase">
              Results for <span className="text-primary italic">&quot;{query}&quot;</span>
            </h2>
          </div>

          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="font-mono text-sm opacity-50">Search indexing via MeiliSearch is configured in <span className="text-primary">/api/search</span></p>
          </div>
        </section>
      )}
    </div>
  )
}