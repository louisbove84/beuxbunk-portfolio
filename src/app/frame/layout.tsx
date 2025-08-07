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
    // New fc:miniapp format for sharing
    'fc:miniapp': JSON.stringify({
      version: "1",
      imageUrl: "https://www.beuxbunk.com/api/frame-image",
      button: {
        title: "🎮 Play Space Invaders",
        action: {
          type: "launch_miniapp",
          url: "https://www.beuxbunk.com/frame",
          name: "Space Engineer",
          splashImageUrl: "https://www.beuxbunk.com/api/frame-image",
          splashBackgroundColor: "#0a0a2e"
        }
      }
    }),
    // Backward compatibility with fc:frame
    'fc:frame': JSON.stringify({
      version: "1",
      imageUrl: "https://www.beuxbunk.com/api/frame-image",
      button: {
        title: "🎮 Play Space Invaders",
        action: {
          type: "launch_frame",
          url: "https://www.beuxbunk.com/frame",
          name: "Space Engineer",
          splashImageUrl: "https://www.beuxbunk.com/api/frame-image",
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