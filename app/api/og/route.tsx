import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'NewsDesk'
    const category = searchParams.get('category') || 'Technology'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            backgroundColor: '#0a0a0a',
            padding: '60px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                backgroundColor: '#ff3e00',
                color: '#0a0a0a',
                padding: '8px 16px',
                fontSize: '14px',
                fontFamily: 'JetBrains Mono, monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
              }}
            >
              {category}
            </div>
          </div>
          <div
            style={{
              fontSize: title.length > 40 ? '48' : '72',
              fontWeight: '900',
              color: '#f0f0f0',
              fontFamily: 'Space Grotesk, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: '40px',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: '900',
                color: '#ff3e00',
                fontFamily: 'Space Grotesk, sans-serif',
                textTransform: 'uppercase',
              }}
            >
              NewsDesk
            </div>
            <div
              style={{
                fontSize: '14px',
                fontFamily: 'JetBrains Mono, monospace',
                color: '#a0a0a0',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
              }}
            >
              Visual Logic v4.0
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e) {
    console.error(e)
    return new Response('Failed to generate OG image', { status: 500 })
  }
}