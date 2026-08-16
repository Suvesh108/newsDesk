'use client'

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { clsx } from 'clsx'

interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  icon?: React.ReactNode
}

export function StatsCard({ title, value, change, icon }: StatsCardProps) {
  const isPositive = change && change > 0
  const isNegative = change && change < 0

  const formatValue = (val: string | number) => {
    if (typeof val === 'number' && val >= 1000) {
      return val.toLocaleString()
    }
    return val
  }

  return (
    <div className="brutalist-border p-4 lg:p-6 hover:bg-surface-container transition-colors group">
      <div className="flex items-start justify-between mb-3 lg:mb-4">
        <span className="label-mono opacity-100">{title}</span>
        {icon && <div className="text-primary group-hover:scale-110 transition-transform">{icon}</div>}
      </div>
      <div className="text-2xl lg:text-4xl font-black mb-2">{formatValue(value)}</div>
      {change !== undefined && (
        <div className={clsx(
          'flex items-center gap-1 font-mono text-xs lg:text-sm',
          isPositive && 'text-green-500',
          isNegative && 'text-red-500',
          !isPositive && !isNegative && 'text-on-surface-variant'
        )}>
          {isPositive && <TrendingUp size={14} />}
          {isNegative && <TrendingDown size={14} />}
          {!isPositive && !isNegative && <Minus size={14} />}
          <span>{isPositive ? '+' : ''}{change}%</span>
        </div>
      )}
    </div>
  )
}