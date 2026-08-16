'use client'

import { Sidebar } from '@/components/dashboard/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-6 lg:p-10 pt-20 lg:pt-10">
        {children}
      </main>
    </div>
  )
}