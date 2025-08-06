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
    // New fc:miniapp format for sharing
    'fc:miniapp': JSON.stringify({
      version: "1",
      imageUrl: "https://beuxbunk-portfolio.vercel.app/api/frame-image",
      button: {
        title: "🎮 Play Space Invaders",
        action: {
          type: "launch_miniapp",
          url: "https://beuxbunk-portfolio.vercel.app/frame",
          name: "Space Engineer",
          splashImageUrl: "https://beuxbunk-portfolio.vercel.app/api/frame-image",
          splashBackgroundColor: "#0a0a2e"
        }
      }
    }),
    // Backward compatibility with fc:frame
    'fc:frame': JSON.stringify({
      version: "1",
      imageUrl: "https://beuxbunk-portfolio.vercel.app/api/frame-image",
      button: {
        title: "🎮 Play Space Invaders",
        action: {
          type: "launch_frame",
          url: "https://beuxbunk-portfolio.vercel.app/frame",
          name: "Space Engineer",
          splashImageUrl: "https://beuxbunk-portfolio.vercel.app/api/frame-image",
          splashBackgroundColor: "#0a0a2e"
        }
      }
    }),
  },
}

export default function FrameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}