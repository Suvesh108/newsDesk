'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import { useToast, Toast as ToastType } from '@/hooks/useToast'
import { clsx } from 'clsx'

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
}

const colorMap = {
  success: 'border-green-500/50 bg-green-500/10 text-green-400',
  error: 'border-red-500/50 bg-red-500/10 text-red-400',
  info: 'border-primary/50 bg-primary/10 text-primary',
}

function ToastItem({ toast, onRemove }: { toast: ToastType; onRemove: (id: string) => void }) {
  const Icon = iconMap[toast.type]

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      className={clsx(
        'flex items-center gap-3 px-5 py-4 border min-w-[320px] max-w-[420px] shadow-lg',
        colorMap[toast.type]
      )}
    >
      <Icon size={18} className="shrink-0" />
      <span className="font-mono text-xs uppercase tracking-wider flex-1">{toast.message}</span>
      <button onClick={() => onRemove(toast.id)} className="shrink-0 opacity-50 hover:opacity-100 transition-opacity">
        <X size={14} />
      </button>
    </motion.div>
  )
}

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  )
}
