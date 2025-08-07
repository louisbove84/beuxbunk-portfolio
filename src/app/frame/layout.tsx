import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Space Engineer - Space Invaders',
  description: 'Interactive Space Invaders game built with MiniKit',
  openGraph: {
    title: 'Space Engineer - Space Invaders',
    description: 'Interactive Space Invaders game built with MiniKit',
    images: ['https://www.beuxbunk.com/api/frame-image'],
  },
  other: {
    // Standard Farcaster Frame meta tags
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://www.beuxbunk.com/api/frame-image',
    'fc:frame:post_url': 'https://www.beuxbunk.com/api/frame',
    'fc:frame:button:1': '🎮 Play Space Invaders',
    'fc:frame:button:1:action': 'link',
    'fc:frame:button:1:target': 'https://www.beuxbunk.com/frame',
    
    // Twitter/X meta tags for better sharing
    'twitter:card': 'summary_large_image',
    'twitter:title': 'Space Engineer - Space Invaders',
    'twitter:description': 'Interactive Space Invaders game built with MiniKit',
    'twitter:image': 'https://www.beuxbunk.com/api/frame-image',
  },
}

export default function FrameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}