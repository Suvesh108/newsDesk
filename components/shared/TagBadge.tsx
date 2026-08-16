'use client'

import { clsx } from 'clsx'

interface TagBadgeProps {
  tag: string
  variant?: 'default' | 'outline'
  className?: string
}

export function TagBadge({ tag, variant = 'default', className }: TagBadgeProps) {
  return (
    <span
      className={clsx(
        'label-mono px-3 py-1 border border-white/20',
        variant === 'default' && 'bg-surface-container',
        className
      )}
    >
      {tag}
    </span>
  )
}