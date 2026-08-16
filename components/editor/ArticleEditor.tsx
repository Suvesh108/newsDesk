'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import { useEffect } from 'react'
import { Toolbar } from './Toolbar'

interface ArticleEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export function ArticleEditor({ content, onChange, placeholder = 'Start writing your story...' }: ArticleEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Image.configure({
        HTMLAttributes: { class: 'max-w-full h-auto' },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-primary underline' },
      }),
      Placeholder.configure({ placeholder }),
      CharacterCount,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'tiptap prose-brutalist min-h-[500px] focus:outline-none',
      },
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if (!editor) return null

  return (
    <div className="border border-white/10 bg-surface">
      <Toolbar editor={editor} />
      <div className="p-8">
        <EditorContent editor={editor} />
      </div>
      <div className="px-8 py-4 border-t border-white/10 flex items-center justify-between">
        <span className="label-mono">
          {editor.storage.characterCount.words()} words
        </span>
        <span className="label-mono">
          ~{Math.ceil(editor.storage.characterCount.words() / 200)} min read
        </span>
      </div>
    </div>
  )
}