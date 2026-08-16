'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

export function SearchBar() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams?.get('q') || '')
  const router = useRouter()

  useEffect(() => {
    const q = searchParams?.get('q') || ''
    setQuery(q)
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-4xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full input-brutalist text-2xl lg:text-4xl"
        placeholder="Search indexing..."
      />
      <button
        type="submit"
        className="absolute right-0 bottom-4 text-primary hover:translate-x-2 transition-transform"
        aria-label="Search"
      >
        <ArrowRight size={32} />
      </button>
    </form>
  )
}