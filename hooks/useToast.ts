'use client'

import { useState, useCallback, useEffect } from 'react'

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

let toastListeners: ((toast: Toast) => void)[] = []

export function addToast(message: string, type: Toast['type'] = 'info') {
  const toast: Toast = { id: Date.now().toString(), message, type }
  toastListeners.forEach(fn => fn(toast))
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  useEffect(() => {
    const listener = (toast: Toast) => {
      setToasts(prev => [...prev, toast])
      setTimeout(() => removeToast(toast.id), 4000)
    }
    toastListeners.push(listener)
    return () => {
      toastListeners = toastListeners.filter(l => l !== listener)
    }
  }, [removeToast])

  return { toasts, removeToast }
}
