'use client'

import { useState } from 'react'
import { X, Zap, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface QuickPublishModalProps {
  isOpen: boolean
  onClose: () => void
  onPublish: () => Promise<void>
  articleTitle: string
}

export function QuickPublishModal({ isOpen, onClose, onPublish, articleTitle }: QuickPublishModalProps) {
  const [publishing, setPublishing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePublish = async () => {
    setPublishing(true)
    setError(null)
    try {
      await onPublish()
      setSuccess(true)
      setTimeout(() => {
        onClose()
        setSuccess(false)
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to publish')
      setPublishing(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-surface border border-white/10 w-full max-w-md p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-2xl font-black uppercase">Quick Publish</h2>
              <button onClick={onClose} className="hover:text-primary transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="mb-6 p-4 bg-surface-container border border-white/10">
              <span className="label-mono mb-2 block">Article</span>
              <p className="font-display text-xl">{articleTitle}</p>
            </div>

            <div className="mb-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Zap size={16} className="text-primary" />
                <span>AI SEO enrichment will be applied</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Zap size={16} className="text-primary" />
                <span>Meta title, description, and tags optimized</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Zap size={16} className="text-primary" />
                <span>Article will be live immediately</span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 border border-red-500/50 bg-red-500/10 text-red-400 font-mono text-xs uppercase">
                {error}
              </div>
            )}

            {success ? (
              <div className="flex items-center justify-center gap-3 bg-green-500/20 text-green-500 p-4">
                <Check size={20} />
                <span className="font-mono uppercase">Published Successfully!</span>
              </div>
            ) : (
              <button
                onClick={handlePublish}
                disabled={publishing}
                className="w-full bg-primary text-on-primary py-4 font-display font-bold uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {publishing ? 'Publishing...' : 'Publish Now'}
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}