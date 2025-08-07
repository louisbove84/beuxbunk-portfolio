import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Meme Games Hub - Choose Your Chaos',
  description: 'Two iconic meme games: Space Invaders and This Is Fine Runner. Choose your chaos!',
  openGraph: {
    title: 'Meme Games Hub - Choose Your Chaos',
    description: 'Two iconic meme games: Space Invaders and This Is Fine Runner. Choose your chaos!',
    images: ['https://www.beuxbunk.com/itsFine-3x2.jpg'],
    type: 'website',
    url: 'https://www.beuxbunk.com/frame',
  },
  other: {
    // Mini App embed (new format)
    'fc:miniapp': JSON.stringify({
      version: "1",
      imageUrl: "https://www.beuxbunk.com/itsFine-3x2.jpg",
      button: {
        title: "🎮 Play Meme Games",
        action: {
          type: "launch_miniapp",
          url: "https://www.beuxbunk.com/frame",
          name: "Meme Games Hub",
          splashImageUrl: "https://www.beuxbunk.com/itsFine-3x2.jpg",
          splashBackgroundColor: "#FF6B6B"
        }
      }
    }),
    
    // Twitter/X meta tags for better sharing
    'twitter:card': 'summary_large_image',
    'twitter:title': 'Meme Games Hub - Choose Your Chaos',
    'twitter:description': 'Two iconic meme games: Space Invaders and This Is Fine Runner. Choose your chaos!',
    'twitter:image': 'https://www.beuxbunk.com/itsFine-3x2.jpg',
    'twitter:url': 'https://www.beuxbunk.com/frame',
    'twitter:site': '@beuxbunk',
    
    // Additional Open Graph for better feed display
    'og:title': 'Meme Games Hub - Choose Your Chaos',
    'og:description': 'Two iconic meme games: Space Invaders and This Is Fine Runner. Choose your chaos!',
    'og:image': 'https://www.beuxbunk.com/itsFine-3x2.jpg',
    'og:image:width': '1200',
    'og:image:height': '800',
    'og:type': 'website',
    'og:url': 'https://www.beuxbunk.com/frame',
  },
}

export default function FrameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}