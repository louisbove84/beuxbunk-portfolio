import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Create SVG for the endless runner frame
  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#98FB98;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="groundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#228B22;stop-opacity:1" />
          <stop offset="30%" style="stop-color:#8B4513;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Sky background -->
      <rect width="1200" height="630" fill="url(#skyGradient)"/>
      
      <!-- Clouds -->
      <g fill="rgba(255,255,255,0.8)">
        <ellipse cx="200" cy="120" rx="40" ry="20"/>
        <ellipse cx="220" cy="110" rx="50" ry="25"/>
        <ellipse cx="240" cy="120" rx="35" ry="18"/>
        
        <ellipse cx="500" cy="80" rx="45" ry="22"/>
        <ellipse cx="520" cy="70" rx="55" ry="28"/>
        <ellipse cx="545" cy="80" rx="40" ry="20"/>
        
        <ellipse cx="800" cy="140" rx="35" ry="18"/>
        <ellipse cx="815" cy="130" rx="45" ry="23"/>
        <ellipse cx="835" cy="140" rx="30" ry="15"/>
        
        <ellipse cx="1000" cy="100" rx="50" ry="25"/>
        <ellipse cx="1025" cy="90" rx="60" ry="30"/>
        <ellipse cx="1050" cy="100" rx="40" ry="20"/>
      </g>
      
      <!-- Ground -->
      <rect x="0" y="450" width="1200" height="180" fill="url(#groundGradient)"/>
      
      <!-- Running character (player) -->
      <g transform="translate(150,400)">
        <!-- Body -->
        <rect x="0" y="0" width="30" height="40" fill="#FF6B6B" rx="5"/>
        <!-- Head -->
        <circle cx="15" cy="-10" r="12" fill="#FFB6C1"/>
        <!-- Eyes -->
        <circle cx="10" cy="-12" r="2" fill="#000"/>
        <circle cx="20" cy="-12" r="2" fill="#000"/>
        <!-- Mouth -->
        <ellipse cx="15" cy="-6" rx="4" ry="2" fill="#000"/>
        <!-- Arms -->
        <rect x="-5" y="5" width="8" height="20" fill="#FFB6C1" rx="4"/>
        <rect x="27" y="5" width="8" height="20" fill="#FFB6C1" rx="4"/>
        <!-- Legs (running position) -->
        <rect x="5" y="40" width="8" height="25" fill="#FFB6C1" rx="4"/>
        <rect x="17" y="35" width="8" height="30" fill="#FFB6C1" rx="4"/>
      </g>
      
      <!-- Obstacles -->
      <rect x="400" y="420" width="30" height="45" fill="#8B4513" rx="3"/>
      <rect x="600" y="415" width="35" height="50" fill="#8B4513" rx="3"/>
      <rect x="850" y="425" width="25" height="40" fill="#8B4513" rx="3"/>
      
      <!-- Motion lines behind character -->
      <g stroke="#FFF" stroke-width="3" opacity="0.6">
        <line x1="50" y1="380" x2="100" y2="390"/>
        <line x1="40" y1="400" x2="90" y2="410"/>
        <line x1="60" y1="420" x2="110" y2="430"/>
        <line x1="30" y1="440" x2="80" y2="450"/>
      </g>
      
      <!-- Title -->
      <text x="600" y="80" font-family="monospace" font-size="48" font-weight="bold" text-anchor="middle" fill="#000" stroke="#FFF" stroke-width="2">
        SPACE ENGINEER
      </text>
      
      <!-- Subtitle -->
      <text x="600" y="130" font-family="monospace" font-size="32" font-weight="bold" text-anchor="middle" fill="#2F4F4F">
        Endless Runner
      </text>
      
      <!-- Game description -->
      <text x="600" y="200" font-family="monospace" font-size="24" text-anchor="middle" fill="#2F4F4F">
        Jump over obstacles and run as far as you can!
      </text>
      
      <!-- Instructions -->
      <text x="600" y="250" font-family="monospace" font-size="20" text-anchor="middle" fill="#2F4F4F">
        TAP to JUMP • Avoid the obstacles
      </text>
      
      <!-- Frame border -->
      <rect x="10" y="10" width="1180" height="610" fill="none" stroke="#2F4F4F" stroke-width="8" rx="20"/>
      
      <!-- Play button indicator -->
      <rect x="500" y="520" width="200" height="60" fill="#32CD32" stroke="#228B22" stroke-width="3" rx="10"/>
      <text x="600" y="560" font-family="monospace" font-size="24" font-weight="bold" text-anchor="middle" fill="#FFF">
        🏃 PLAY GAME
      </text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}