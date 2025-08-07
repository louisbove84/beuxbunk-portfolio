import { NextResponse } from 'next/server';

export async function GET() {
  // Create meme-themed SVG for the This Is Fine runner frame
  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fireGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#FF4500;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#FF6347;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#DC143C;stop-opacity:1" />
        </linearGradient>
        <filter id="memeGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Burning room background -->
      <rect width="100%" height="100%" fill="url(#fireGradient)" />
      
      <!-- Smoke clouds -->
      <g fill="#696969" opacity="0.6">
        <ellipse cx="200" cy="100" rx="50" ry="25"/>
        <ellipse cx="250" cy="120" rx="60" ry="30"/>
        <ellipse cx="300" cy="90" rx="40" ry="20"/>
        <ellipse cx="800" cy="150" rx="70" ry="35"/>
        <ellipse cx="880" cy="130" rx="55" ry="28"/>
        <ellipse cx="1000" cy="110" rx="45" ry="23"/>
      </g>
      
      <!-- Floor (burning) -->
      <rect x="0" y="580" width="1200" height="50" fill="#8B4513" />
      <g fill="#FF4500">
        <polygon points="50,580 70,560 90,580" />
        <polygon points="200,580 220,560 240,580" />
        <polygon points="400,580 420,560 440,580" />
        <polygon points="600,580 620,560 640,580" />
        <polygon points="800,580 820,560 840,580" />
        <polygon points="1000,580 1020,560 1040,580" />
      </g>
      
      <!-- This Is Fine Dog (main character) -->
      <g transform="translate(100, 480)">
        <!-- Body -->
        <rect x="20" y="40" width="60" height="60" fill="#8B4513" rx="5"/>
        <!-- Head -->
        <circle cx="50" cy="30" r="25" fill="#8B4513" />
        <!-- Eyes (calm expression) -->
        <circle cx="40" cy="25" r="4" fill="white" />
        <circle cx="60" cy="25" r="4" fill="white" />
        <circle cx="40" cy="25" r="2" fill="black" />
        <circle cx="60" cy="25" r="2" fill="black" />
        <!-- Smile -->
        <path d="M 35 35 Q 50 42 65 35" stroke="black" stroke-width="2" fill="none" />
        <!-- Hat -->
        <rect x="30" y="5" width="40" height="10" fill="#A0522D" rx="2"/>
        <rect x="25" y="15" width="50" height="5" fill="#A0522D" rx="2"/>
        <!-- Legs -->
        <rect x="10" y="85" width="15" height="25" fill="#8B4513" rx="3"/>
        <rect x="75" y="85" width="15" height="25" fill="#8B4513" rx="3"/>
        <!-- Coffee mug -->
        <rect x="85" y="35" width="12" height="15" fill="#D2B48C" rx="2"/>
        <rect x="92" y="38" width="6" height="2" fill="#654321" />
        <!-- Steam from coffee -->
        <path d="M 91 30 Q 93 25 91 20" stroke="#FFF" stroke-width="1" fill="none" opacity="0.7"/>
        <path d="M 94 28 Q 96 23 94 18" stroke="#FFF" stroke-width="1" fill="none" opacity="0.7"/>
      </g>
      
      <!-- Fire obstacles -->
      <g fill="#FF4500">
        <polygon points="900,580 915,540 930,580" />
        <polygon points="910,580 925,540 940,580" />
      </g>
      <g fill="#FF6347">
        <polygon points="905,580 920,545 935,580" />
      </g>
      
      <!-- Falling debris -->
      <rect x="700" y="50" width="30" height="40" fill="#696969" rx="3"/>
      <rect x="750" y="80" width="25" height="35" fill="#808080" rx="3"/>
      <rect x="600" y="30" width="20" height="30" fill="#696969" rx="2"/>
      
      <!-- Coffee collectibles -->
      <g fill="#D2B48C">
        <rect x="500" y="400" width="15" height="18" rx="2"/>
        <rect x="300" y="350" width="15" height="18" rx="2"/>
        <rect x="450" y="420" width="15" height="18" rx="2"/>
      </g>
      <g fill="#654321">
        <rect x="507" y="403" width="4" height="2"/>
        <rect x="307" y="353" width="4" height="2"/>
        <rect x="457" y="423" width="4" height="2"/>
      </g>
      
      <!-- Meme title -->
      <text x="600" y="80" font-family="Comic Sans MS, cursive" font-size="48" font-weight="bold" fill="#FFFFFF" stroke="#000" stroke-width="3" text-anchor="middle" filter="url(#memeGlow)">
        THIS IS FINE RUNNER
      </text>
      
      <!-- Meme subtitle -->
      <text x="600" y="130" font-family="Comic Sans MS, cursive" font-size="24" fill="#FFFF99" stroke="#000" stroke-width="2" text-anchor="middle">
        🔥 Everything is totally fine! 🔥
      </text>
      
      <!-- Instructions -->
      <text x="600" y="170" font-family="Comic Sans MS, cursive" font-size="18" fill="#FFFFFF" stroke="#000" stroke-width="1" text-anchor="middle">
        Tap to Jump • Duck to Survive • Collect Coffee!
      </text>
      
      <!-- Meme speech bubble -->
      <ellipse cx="280" cy="350" rx="70" ry="35" fill="#FFFFFF" stroke="#000" stroke-width="2"/>
      <polygon points="260,375 240,390 280,385" fill="#FFFFFF" stroke="#000" stroke-width="2"/>
      <text x="280" y="345" font-family="Comic Sans MS, cursive" font-size="12" fill="#000" text-anchor="middle" font-weight="bold">
        "This is fine."
      </text>
      <text x="280" y="360" font-family="Comic Sans MS, cursive" font-size="10" fill="#666" text-anchor="middle">
        - Famous Dog
      </text>
      
      <!-- Meme border -->
      <rect x="10" y="10" width="1180" height="610" fill="none" stroke="#FFD93D" stroke-width="8" rx="20"/>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}