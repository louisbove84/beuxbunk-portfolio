import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // Create a simple SVG image for the frame
  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#0a0a2e;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1a1a3a;stop-opacity:1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <rect width="1200" height="630" fill="url(#bg)"/>
      
      <!-- Stars background -->
      <g fill="#ffffff" opacity="0.8">
        ${Array.from({ length: 100 }, () => {
          const x = Math.random() * 1200;
          const y = Math.random() * 630;
          return `<circle cx="${x}" cy="${y}" r="1"/>`;
        }).join('')}
      </g>
      
      <!-- Main title -->
      <text x="600" y="200" text-anchor="middle" font-family="monospace" font-size="72" font-weight="bold" fill="#ffffff" filter="url(#glow)">
        SPACE ENGINEER
      </text>
      
      <!-- Subtitle -->
      <text x="600" y="280" text-anchor="middle" font-family="monospace" font-size="36" fill="#4a90e2">
        LOUIS BOVE
      </text>
      
      <!-- Description -->
      <text x="600" y="340" text-anchor="middle" font-family="monospace" font-size="24" fill="#ffffff">
        Interactive Space Invaders Game
      </text>
      
      <!-- Game elements preview -->
      <g transform="translate(400, 400)">
        <!-- Player ship -->
        <rect x="0" y="0" width="20" height="20" fill="#4a90e2"/>
        <rect x="5" y="-5" width="10" height="5" fill="#4a90e2"/>
        
        <!-- Enemies -->
        <rect x="50" y="0" width="15" height="12" fill="#ff6b6b"/>
        <rect x="80" y="0" width="15" height="12" fill="#ff6b6b"/>
        <rect x="110" y="0" width="15" height="12" fill="#ff6b6b"/>
        
        <!-- Bullets -->
        <rect x="10" y="-20" width="4" height="8" fill="#ffffff"/>
        <rect x="60" y="-15" width="4" height="8" fill="#ffffff"/>
      </g>
      
      <!-- Frame indicator -->
      <rect x="20" y="20" width="200" height="60" rx="10" fill="rgba(74, 144, 226, 0.2)" stroke="#4a90e2" stroke-width="2"/>
      <text x="120" y="55" text-anchor="middle" font-family="monospace" font-size="16" fill="#4a90e2">
        FARCaster Frame
      </text>
      
      <!-- Buttons preview -->
      <g transform="translate(800, 500)">
        <rect x="0" y="0" width="120" height="40" rx="5" fill="#ff6b6b" stroke="#ffffff" stroke-width="2"/>
        <text x="60" y="25" text-anchor="middle" font-family="monospace" font-size="14" fill="#ffffff">
          PLAY GAME
        </text>
        
        <rect x="140" y="0" width="120" height="40" rx="5" fill="transparent" stroke="#4a90e2" stroke-width="2"/>
        <text x="200" y="25" text-anchor="middle" font-family="monospace" font-size="14" fill="#4a90e2">
          PORTFOLIO
        </text>
      </g>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
} 