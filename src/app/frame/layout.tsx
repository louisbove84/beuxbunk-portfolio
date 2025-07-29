import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Space Engineer Frame - Louis Bove',
  description: 'Interactive Space Invaders game in a Farcaster Frame',
  other: {
    'fc:frame': JSON.stringify({
      version: 'vNext',
      image: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/frame-image`,
      buttons: [
        {
          label: 'Play Space Invaders',
          action: 'post',
        },
        {
          label: 'Visit Portfolio',
          action: 'link',
          target: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}`,
        },
      ],
      postUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/frame`,
    }),
    'fc:frame:image': `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/frame-image`,
    'fc:frame:button:1': 'Play Space Invaders',
    'fc:frame:button:2': 'Visit Portfolio',
    'fc:frame:post_url': `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/frame`,
  },
};

export default function FrameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 