'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  BarChart3,
  Settings,
  PenLine,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { clsx } from 'clsx'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/editor/new', icon: PenLine, label: 'New Article' },
  { href: '/dashboard/stories', icon: FolderOpen, label: 'Stories' },
  { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-surface border border-white/10 hover:text-primary transition-colors"
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      <aside
        className={clsx(
          'fixed left-0 top-0 h-screen bg-surface border-r border-white/10 transition-all duration-300 z-50',
          collapsed ? 'w-16' : 'w-64',
          'max-lg:fixed max-lg:z-50',
          mobileOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-white/10">
            <Link href="/" className="font-display text-xl lg:text-2xl font-black tracking-tighter uppercase hover:text-primary transition-colors">
              {collapsed ? 'ND' : 'NewsDesk'}
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1 hover:text-primary transition-colors"
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex-1 p-3 lg:p-4 space-y-1 lg:space-y-2">
            {navItems.map(item => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-3 px-3 lg:px-4 py-2 lg:py-3 font-mono text-xs lg:text-sm uppercase tracking-wider transition-colors',
                    isActive
                      ? 'bg-primary text-on-primary'
                      : 'hover:bg-surface-container hover:text-primary'
                  )}
                >
                  <item.icon size={16} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              )
            })}
          </nav>

          <div className="p-3 lg:p-4 border-t border-white/10">
            <button className="flex items-center gap-3 px-3 lg:px-4 py-2 lg:py-3 font-mono text-xs lg:text-sm uppercase tracking-wider hover:bg-surface-container transition-colors w-full">
              <LogOut size={16} />
              {!collapsed && <span>Logout</span>}
            </button>
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-surface border border-white/10 rounded-full items-center justify-center hover:bg-primary hover:text-on-primary transition-colors"
          >
            {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
          </button>
        </div>
      </aside>
    </>
  )
}