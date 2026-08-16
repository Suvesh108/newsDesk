'use client'

import { useState, useCallback } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { clsx } from 'clsx'

interface ImageUploaderProps {
  value?: string
  onChange: (url: string) => void
}

export function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleUpload = async (file: File) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (data.data?.url) {
        onChange(data.data.url)
      }
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleUpload(file)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleUpload(file)
    }
  }

  if (value) {
    return (
      <div className="relative aspect-video bg-surface-container border border-white/10 overflow-hidden group">
        <img src={value} alt="Cover" className="w-full h-full object-cover" />
        <button
          onClick={() => onChange('')}
          className="absolute top-2 right-2 p-2 bg-black/80 hover:bg-primary transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    )
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={clsx(
        'aspect-video border-2 border-dashed border-white/20 bg-surface-container flex flex-col items-center justify-center gap-4 transition-colors',
        dragOver && 'border-primary bg-primary/10',
        uploading && 'opacity-50'
      )}
    >
      {uploading ? (
        <div className="animate-pulse">
          <Upload size={32} className="text-primary" />
        </div>
      ) : (
        <>
          <ImageIcon size={32} className="text-on-surface-variant" />
          <span className="label-mono opacity-100">Drag & drop or click to upload</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </>
      )}
    </div>
  )
}