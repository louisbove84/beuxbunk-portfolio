import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeRegistry from '@/components/ThemeRegistry'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BeuxBunk - Space Engineer Portfolio',
  description: 'Software Engineer and Space Enthusiast',
  openGraph: {
    title: 'Space Engineer - Space Invaders',
    description: 'Interactive Space Invaders game built with MiniKit',
    images: ['https://beuxbunk-portfolio.vercel.app/hero-3x2.png'],
  },
  other: {
    // New fc:miniapp format for sharing
    'fc:miniapp': JSON.stringify({
      version: "1",
      imageUrl: "https://beuxbunk-portfolio.vercel.app/hero-3x2.png",
      button: {
        title: "🎮 Play Space Invaders",
        action: {
          type: "launch_miniapp",
          url: "https://beuxbunk-portfolio.vercel.app/frame",
          name: "Space Engineer",
          splashImageUrl: "https://beuxbunk-portfolio.vercel.app/splash.png",
          splashBackgroundColor: "#0a0a2e"
        }
      }
    }),
    // Backward compatibility with fc:frame
          'fc:frame': JSON.stringify({
        version: "1",
        imageUrl: "https://beuxbunk-portfolio.vercel.app/hero-3x2.png",
      button: {
        title: "🎮 Play Space Invaders",
        action: {
          type: "launch_frame",
          url: "https://beuxbunk-portfolio.vercel.app/frame",
          name: "Space Engineer",
          splashImageUrl: "https://beuxbunk-portfolio.vercel.app/splash.png",
          splashBackgroundColor: "#0a0a2e"
        }
      }
    }),
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ThemeRegistry>
            {children}
          </ThemeRegistry>
        </Providers>
      </body>
    </html>
  )
}
