import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { uploadImage } from '@/lib/cloudinary'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ data: null, error: 'No file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const url = await uploadImage(buffer, 'newsdesk/articles')

    return NextResponse.json({ data: { url }, error: null })
  } catch (error) {
    console.error('POST /api/upload error:', error)
    return NextResponse.json({ data: null, error: 'Failed to upload image' }, { status: 500 })
  }
}