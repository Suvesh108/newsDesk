'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { ArticleEditor } from '@/components/editor/ArticleEditor'
import { PublishPanel } from '@/components/editor/PublishPanel'
import { Category } from '@/types/article'

export default function NewArticlePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState<Category>('Tech')
  const [tags, setTags] = useState<string[]>([])
  const [coverImage, setCoverImage] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDesc, setMetaDesc] = useState('')
  const [saving, setSaving] = useState(false)
  const [isEnriching, setIsEnriching] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category, tags, coverImage, status: 'DRAFT' }),
      })
      const data = await response.json()
      if (data.data?.id) {
        router.push(`/dashboard/editor/${data.data.id}`)
      }
    } catch (error) {
      console.error('Save failed:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleEnrich = async () => {
    if (!title || !content) return
    setIsEnriching(true)
    try {
      const response = await fetch('/api/ai/enrich', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category }),
      })
      const data = await response.json()
      if (data.data) {
        setMetaTitle(data.data.metaTitle)
        setMetaDesc(data.data.metaDescription)
        setTags(data.data.tags)
        setExcerpt(data.data.excerpt)
      }
    } catch (error) {
      console.error('Enrich failed:', error)
    } finally {
      setIsEnriching(false)
    }
  }

  const handlePublish = async () => {
    if (!title || !content) return
    setIsPublishing(true)
    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category, tags, coverImage, excerpt, metaTitle, metaDesc }),
      })
      const data = await response.json()
      if (data.data?.id) {
        const publishResponse = await fetch('/api/publish', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ articleId: data.data.id }),
        })
        const publishData = await publishResponse.json()
        if (publishData.data?.url) {
          window.open(publishData.data.url, '_blank')
        }
      }
    } catch (error) {
      console.error('Publish failed:', error)
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-10">
        <div className="flex items-center gap-3 lg:gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 label-mono hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <h1 className="text-2xl lg:text-4xl font-black">New Article</h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 brutalist-border p-3 lg:p-4 hover-invert label-mono opacity-100 disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save Draft
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
        <div className="lg:col-span-8">
          <ArticleEditor
            content={content}
            onChange={setContent}
            placeholder="Start writing your story..."
          />
        </div>

        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-10">
            <PublishPanel
              title={title}
              content={content}
              category={category}
              tags={tags}
              coverImage={coverImage}
              excerpt={excerpt}
              metaTitle={metaTitle}
              metaDesc={metaDesc}
              onEnrich={handleEnrich}
              onPublish={handlePublish}
              isEnriching={isEnriching}
              isPublishing={isPublishing}
              onTitleChange={setTitle}
              onContentChange={setContent}
              onCategoryChange={setCategory}
              onTagsChange={setTags}
              onCoverImageChange={setCoverImage}
              onExcerptChange={setExcerpt}
              onMetaTitleChange={setMetaTitle}
              onMetaDescChange={setMetaDesc}
            />
          </div>
        </div>
      </div>
    </div>
  )
}