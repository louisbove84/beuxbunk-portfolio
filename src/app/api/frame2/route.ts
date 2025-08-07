import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { untrustedData } = body;

    const buttonIndex = untrustedData?.buttonIndex || 1;

    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

    if (buttonIndex === 1) {
      // Play Endless Runner button
      return NextResponse.json({
        image: `${baseUrl}/api/frame2-image`,
        buttons: [
          {
            label: '🏃 Play Game',
            action: 'link',
            target: `${baseUrl}/frame2`,
          },
        ],
        postUrl: `${baseUrl}/api/frame2`,
      });
    } else {
      // Default response (back button or initial load)
      return NextResponse.json({
        image: `${baseUrl}/api/frame2-image`,
        buttons: [
          {
            label: '🏃 Play Endless Runner',
            action: 'post',
          },
        ],
        postUrl: `${baseUrl}/api/frame2`,
      });
    }
  } catch (error) {
    console.error('Frame2 API error:', error);
    
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    
    return NextResponse.json({
      image: `${baseUrl}/api/frame2-image`,
      buttons: [
        {
          label: '🏃 Play Endless Runner',
          action: 'post',
        },
      ],
      postUrl: `${baseUrl}/api/frame2`,
    });
  }
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
  
  return NextResponse.json({
    image: `${baseUrl}/api/frame2-image`,
    buttons: [
      {
        label: '🏃 Play Endless Runner',
        action: 'post',
      },
    ],
    postUrl: `${baseUrl}/api/frame2`,
  });
}