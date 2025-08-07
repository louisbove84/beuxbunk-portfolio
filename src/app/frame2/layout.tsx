import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Space Engineer - Endless Runner',
  description: 'Side-scrolling endless runner game with jump controls',
  openGraph: {
    title: 'Space Engineer - Endless Runner',
    description: 'Side-scrolling endless runner game with jump controls',
    images: ['https://www.beuxbunk.com/api/frame2-image'],
  },
  other: {
    // Standard Farcaster Frame meta tags
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://www.beuxbunk.com/api/frame2-image',
    'fc:frame:post_url': 'https://www.beuxbunk.com/api/frame2',
    'fc:frame:button:1': '🏃 Play Endless Runner',
    'fc:frame:button:1:action': 'post',
    
    // Twitter/X meta tags for better sharing
    'twitter:card': 'summary_large_image',
    'twitter:title': 'Space Engineer - Endless Runner',
    'twitter:description': 'Side-scrolling endless runner game with jump controls',
    'twitter:image': 'https://www.beuxbunk.com/api/frame2-image',
  },
}

export default function Frame2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}