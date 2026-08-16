'use client'

import { Bolt } from 'lucide-react'

interface BreakingTickerProps {
  headlines?: string[]
}

export function BreakingTicker({ headlines = [] }: BreakingTickerProps) {
  const defaultHeadlines = [
    'Global Markets Rally Following Unexpected Federal Reserve Announcement',
    'Tech Giants Announce Historic Partnership on AI Ethics Board',
    'Major Breakthrough in Fusion Energy Yields Net Positive Result',
    'International Climate Summit Concludes with Binding Emissions Treaty',
  ]

  const items = headlines.length > 0 ? headlines : defaultHeadlines

  return (
    <div className="bg-primary text-on-primary overflow-hidden flex items-center h-12 group/ticker">
      <div className="flex items-center gap-2 px-6 lg:px-10 shrink-0 border-r border-black/20 mr-4 h-full">
        <Bolt size={14} className="fill-on-primary shrink-0" />
        <span className="font-mono font-black uppercase tracking-tighter text-[12px] shrink-0">Alert</span>
      </div>
      <div className="flex whitespace-nowrap animate-marquee group-hover/ticker:[animation-play-state:paused]">
        {items.map((h, i) => (
          <span key={i} className="mx-8 lg:mx-12 font-display font-bold uppercase tracking-tighter text-xs lg:text-sm">
            {h} <span className="ml-8 lg:ml-12 opacity-30">//</span>
          </span>
        ))}
        {items.map((h, i) => (
          <span key={`dup-${i}`} className="mx-8 lg:mx-12 font-display font-bold uppercase tracking-tighter text-xs lg:text-sm">
            {h} <span className="ml-8 lg:ml-12 opacity-30">//</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  )
}