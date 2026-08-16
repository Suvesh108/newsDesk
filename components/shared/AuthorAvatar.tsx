'use client'

import Image from 'next/image'
import { Author } from '@/types/article'

interface AuthorAvatarProps {
  author: Author
  size?: number
  className?: string
}

export function AuthorAvatar({ author, size = 40, className = '' }: AuthorAvatarProps) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={author.avatar || '/default-avatar.png'}
        alt={author.name}
        fill
        className="object-cover"
        sizes={`${size}px`}
      />
    </div>
  )
}