'use client'

import { StatsCard } from '@/components/dashboard/StatsCard'
import { Eye, FileText, Users, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 lg:space-y-10">
      <div>
        <h1 className="text-4xl lg:text-6xl font-black mb-2">Analytics</h1>
        <p className="label-mono opacity-100">Track your content performance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <StatsCard
          title="Total Views"
          value="125,847"
          icon={<Eye size={20} />}
          change={15.3}
        />
        <StatsCard
          title="Articles Published"
          value="24"
          icon={<FileText size={20} />}
          change={8.2}
        />
        <StatsCard
          title="Unique Visitors"
          value="45,231"
          icon={<Users size={20} />}
          change={22.1}
        />
        <StatsCard
          title="Avg. Read Time"
          value="4.2 min"
          icon={<TrendingUp size={20} />}
          change={-5.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        <div className="brutalist-border p-4 lg:p-8">
          <h2 className="text-xl lg:text-2xl font-black mb-4 lg:mb-6">Top Performing Articles</h2>
          <div className="space-y-4">
            {[
              { title: 'The Silicon Ceiling: Why Next-Gen Models Face Physical Limits', views: 24521 },
              { title: 'Global Markets Brace for Unprecedented Shift', views: 18932 },
              { title: 'The Dawn of Sentient Algorithms', views: 15421 },
            ].map((article, i) => (
              <div key={i} className="flex items-center justify-between p-3 lg:p-4 bg-surface-container hover:bg-surface-bright transition-colors cursor-pointer">
                <div className="flex items-center gap-3 lg:gap-4 min-w-0">
                  <span className="font-display text-2xl lg:text-4xl text-primary shrink-0">{i + 1}</span>
                  <span className="font-display text-sm lg:text-base truncate">{article.title.slice(0, 40)}...</span>
                </div>
                <span className="font-mono text-xs lg:text-sm shrink-0">{article.views.toLocaleString()} views</span>
              </div>
            ))}
          </div>
        </div>

        <div className="brutalist-border p-4 lg:p-8">
          <h2 className="text-xl lg:text-2xl font-black mb-4 lg:mb-6">Traffic by Category</h2>
          <div className="space-y-4">
            {[
              { category: 'Tech', percentage: 45 },
              { category: 'Business', percentage: 28 },
              { category: 'Politics', percentage: 15 },
              { category: 'Science', percentage: 8 },
              { category: 'Culture', percentage: 4 },
            ].map((cat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm uppercase">{cat.category}</span>
                  <span className="font-mono text-sm">{cat.percentage}%</span>
                </div>
                <div className="h-2 bg-surface-container">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="brutalist-border p-4 lg:p-8">
        <h2 className="text-xl lg:text-2xl font-black mb-4 lg:mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'Article published', title: 'Global Markets Brace for Unprecedented Shift', time: '2 hours ago' },
            { action: 'Article draft saved', title: 'The Future of AI Regulation', time: '5 hours ago' },
            { action: 'SEO enrichment applied', title: 'Tech Industry Quarterly Report', time: '1 day ago' },
            { action: 'Article published', title: 'The Silicon Ceiling: Why Next-Gen Models', time: '2 days ago' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 lg:p-4 border border-white/10 hover:bg-surface-container transition-colors gap-4">
              <div className="flex items-center gap-3 lg:gap-4 min-w-0">
                <div className="w-8 lg:w-10 h-8 lg:h-10 bg-surface-container flex items-center justify-center shrink-0">
                  <Calendar size={14} />
                </div>
                <div className="min-w-0">
                  <span className="label-mono opacity-100">{item.action}</span>
                  <p className="font-display text-sm lg:text-lg truncate">{item.title}</p>
                </div>
              </div>
              <span className="label-mono shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}