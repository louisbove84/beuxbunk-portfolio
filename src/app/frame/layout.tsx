import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Space Engineer - Space Invaders',
  description: 'Interactive Space Invaders game built with MiniKit',
  openGraph: {
    title: 'Space Engineer - Space Invaders',
    description: 'Interactive Space Invaders game built with MiniKit',
    images: ['https://beuxbunk-portfolio.vercel.app/api/frame-image'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://beuxbunk-portfolio.vercel.app/api/frame-image',
    'fc:frame:button:1': '🎮 Play Space Invaders',
    'fc:frame:button:1:action': 'post',
    'fc:frame:button:2': '🏠 Visit Portfolio',
    'fc:frame:button:2:action': 'link',
    'fc:frame:button:2:target': 'https://beuxbunk-portfolio.vercel.app',
    'fc:frame:post_url': 'https://beuxbunk-portfolio.vercel.app/api/frame',
  },
}

export default function FrameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 