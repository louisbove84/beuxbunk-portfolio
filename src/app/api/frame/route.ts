import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { untrustedData } = body;
    
    // Get the button index that was clicked
    const buttonIndex = untrustedData?.buttonIndex || 1;
    
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    
    // Different responses based on button clicked
    if (buttonIndex === 1) {
      // Play Space Invaders button
      return NextResponse.json({
        frames: [
          {
            image: `${baseUrl}/api/frame-image`,
            buttons: [
              {
                label: '🎮 Play Game',
                action: 'link',
                target: `${baseUrl}/frame`,
              },
              {
                label: '🏠 Back to Frame',
                action: 'post',
              },
            ],
            postUrl: `${baseUrl}/api/frame`,
          },
        ],
      });
    } else if (buttonIndex === 2) {
      // Visit Portfolio button
      return NextResponse.json({
        frames: [
          {
            image: `${baseUrl}/api/frame-image`,
            buttons: [
              {
                label: '🚀 View Portfolio',
                action: 'link',
                target: baseUrl,
              },
              {
                label: '🎮 Play Game',
                action: 'link',
                target: `${baseUrl}/frame`,
              },
            ],
            postUrl: `${baseUrl}/api/frame`,
          },
        ],
      });
    } else {
      // Default response (back button or initial load)
      return NextResponse.json({
        frames: [
          {
            image: `${baseUrl}/api/frame-image`,
            buttons: [
              {
                label: '🎮 Play Space Invaders',
                action: 'post',
              },
              {
                label: '🏠 Visit Portfolio',
                action: 'link',
                target: baseUrl,
              },
            ],
            postUrl: `${baseUrl}/api/frame`,
          },
        ],
      });
    }
  } catch (error) {
    console.error('Frame API error:', error);
    
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    
    return NextResponse.json({
      frames: [
        {
          image: `${baseUrl}/api/frame-image`,
          buttons: [
            {
              label: '🎮 Play Space Invaders',
              action: 'post',
            },
            {
              label: '🏠 Visit Portfolio',
              action: 'link',
              target: baseUrl,
            },
          ],
          postUrl: `${baseUrl}/api/frame`,
        },
      ],
    });
  }
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
  
  return NextResponse.json({
    frames: [
      {
        image: `${baseUrl}/api/frame-image`,
        buttons: [
          {
            label: '🎮 Play Space Invaders',
            action: 'post',
          },
          {
            label: '🏠 Visit Portfolio',
            action: 'link',
            target: baseUrl,
          },
        ],
        postUrl: `${baseUrl}/api/frame`,
      },
    ],
  });
} 