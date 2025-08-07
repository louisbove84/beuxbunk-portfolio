'use client';

import React, { useState, useEffect, useRef } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  velocity?: number;
}

interface GameObjects {
  player: GameObject;
  obstacles: GameObject[];
  clouds: GameObject[];
}

const SideScrollGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState('playing');
  const [score, setScore] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [gameWidth, setGameWidth] = useState(320);
  const [gameHeight, setGameHeight] = useState(320);
  const [isJumping, setIsJumping] = useState(false);
  const [gameObjects, setGameObjects] = useState<GameObjects>({
    player: { x: 50, y: 200, width: 20, height: 20, velocity: 0 },
    obstacles: [],
    clouds: [],
  });

  // Initialize the game when component mounts
  useEffect(() => {
    console.log('Side Scroll game initialized');
    
    // Initialize SDK and tell Farcaster the app is ready
    const initializeSDK = async () => {
      try {
        console.log('Calling sdk.actions.ready()');
        await sdk.actions.ready();
        console.log('SDK ready - app should now be visible in Farcaster');
      } catch (error) {
        console.error('SDK ready error:', error);
      }
    };
    
    initializeSDK();
    
    // Detect if we're on mobile and set dimensions
    const updateDimensions = () => {
      const mobile = window.innerWidth <= 768 || 'ontouchstart' in window;
      setIsMobile(mobile);
      setGameWidth(mobile ? window.innerWidth : 320);
      setGameHeight(mobile ? window.innerHeight : 320);
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Initialize canvas and game objects when dimensions change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size based on device
    const dpr = window.devicePixelRatio || 1;
    
    // Set actual canvas size (internal resolution)
    canvas.width = gameWidth * dpr;
    canvas.height = gameHeight * dpr;
    
    // Scale the drawing context to match device pixel ratio
    ctx.scale(dpr, dpr);
    
    // Set CSS size
    canvas.style.width = gameWidth + 'px';
    canvas.style.height = gameHeight + 'px';
    
    // Initialize player position
    const groundY = gameHeight - 60;
    setGameObjects(prev => ({
      ...prev,
      player: { 
        x: 50, 
        y: groundY - 20, 
        width: 20, 
        height: 20,
        velocity: 0
      }
    }));
    
    // Initialize background clouds
    const clouds: GameObject[] = [];
    for (let i = 0; i < 5; i++) {
      clouds.push({
        x: Math.random() * gameWidth,
        y: Math.random() * (gameHeight / 3),
        width: 30 + Math.random() * 20,
        height: 15 + Math.random() * 10,
      });
    }
    
    setGameObjects(prev => ({ ...prev, clouds }));
  }, [gameWidth, gameHeight]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      setGameObjects(prev => {
        const groundY = gameHeight - 60;
        let newPlayer = { ...prev.player };
        
        // Apply gravity
        if (newPlayer.y < groundY - 20) {
          newPlayer.velocity = (newPlayer.velocity || 0) + 0.8; // gravity
          newPlayer.y += newPlayer.velocity;
        } else {
          // On ground
          newPlayer.y = groundY - 20;
          newPlayer.velocity = 0;
          setIsJumping(false);
        }
        
        // Move obstacles left and add new ones
        let obstacles = prev.obstacles
          .map(obstacle => ({ ...obstacle, x: obstacle.x - 3 }))
          .filter(obstacle => obstacle.x > -obstacle.width);
        
        // Add new obstacles randomly
        if (Math.random() < 0.02 && (obstacles.length === 0 || obstacles[obstacles.length - 1].x < gameWidth - 200)) {
          obstacles.push({
            x: gameWidth,
            y: groundY - 30,
            width: 20,
            height: 30,
          });
        }
        
        // Move clouds slowly
        const clouds = prev.clouds.map(cloud => ({
          ...cloud,
          x: cloud.x - 0.5 < -cloud.width ? gameWidth + Math.random() * 100 : cloud.x - 0.5,
        }));
        
        // Check collisions
        const playerRect = {
          x: newPlayer.x,
          y: newPlayer.y,
          width: newPlayer.width,
          height: newPlayer.height,
        };
        
        const collision = obstacles.some(obstacle => {
          return (
            playerRect.x < obstacle.x + obstacle.width &&
            playerRect.x + playerRect.width > obstacle.x &&
            playerRect.y < obstacle.y + obstacle.height &&
            playerRect.y + playerRect.height > obstacle.y
          );
        });
        
        if (collision) {
          setGameState('gameOver');
          return prev;
        }
        
        return {
          player: newPlayer,
          obstacles,
          clouds,
        };
      });
      
      // Increase score
      setScore(prev => prev + 1);
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [gameState, gameHeight]);

  // Handle keyboard input (desktop)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      
      if (e.code === 'Space' && !isJumping) {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, isJumping]);

  // Mobile touch controls
  const handleTouchStart = () => {
    if (gameState === 'playing' && !isJumping) {
      jump();
    }
  };

  const jump = () => {
    setIsJumping(true);
    setGameObjects(prev => ({
      ...prev,
      player: {
        ...prev.player,
        velocity: -15, // Jump velocity
      }
    }));
  };

  // Render game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas with sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, gameHeight);
    gradient.addColorStop(0, '#87CEEB'); // Sky blue
    gradient.addColorStop(1, '#98FB98'); // Light green
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
    
    // Draw clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    gameObjects.clouds.forEach(cloud => {
      ctx.beginPath();
      ctx.arc(cloud.x, cloud.y, cloud.width / 3, 0, 2 * Math.PI);
      ctx.arc(cloud.x + cloud.width / 3, cloud.y, cloud.width / 2, 0, 2 * Math.PI);
      ctx.arc(cloud.x + (cloud.width * 2) / 3, cloud.y, cloud.width / 3, 0, 2 * Math.PI);
      ctx.fill();
    });
    
    // Draw ground
    const groundY = gameHeight - 60;
    ctx.fillStyle = '#8B4513'; // Brown
    ctx.fillRect(0, groundY, gameWidth, 60);
    
    // Draw grass on ground
    ctx.fillStyle = '#228B22'; // Green
    ctx.fillRect(0, groundY, gameWidth, 10);
    
    // Draw touch indicator for mobile (full screen tap area)
    if (isMobile && gameState === 'playing') {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.font = '16px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('TAP TO JUMP', gameWidth / 2, gameHeight - 20);
    }
    
    // Draw player (simple character)
    ctx.fillStyle = '#FF6B6B';
    ctx.fillRect(gameObjects.player.x, gameObjects.player.y, gameObjects.player.width, gameObjects.player.height);
    
    // Draw simple face on player
    ctx.fillStyle = '#000';
    ctx.fillRect(gameObjects.player.x + 5, gameObjects.player.y + 5, 2, 2); // Eye
    ctx.fillRect(gameObjects.player.x + 13, gameObjects.player.y + 5, 2, 2); // Eye
    ctx.fillRect(gameObjects.player.x + 7, gameObjects.player.y + 12, 6, 2); // Mouth
    
    // Draw obstacles
    ctx.fillStyle = '#8B4513';
    gameObjects.obstacles.forEach(obstacle => {
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
    
    // Draw score
    ctx.fillStyle = '#000';
    ctx.font = '16px "Courier New"';
    ctx.textAlign = 'left';
    ctx.fillText(`SCORE: ${Math.floor(score / 10)}`, 10, 30);
    
    // Draw game over screen
    if (gameState === 'gameOver') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, gameWidth, gameHeight);
      ctx.fillStyle = '#ff6b6b';
      ctx.font = '24px "Courier New"';
      ctx.textAlign = 'center';
      const gameOverText = 'GAME OVER';
      ctx.fillText(gameOverText, gameWidth / 2, gameHeight / 2 - 20);
      ctx.font = '16px "Courier New"';
      const finalScoreText = `DISTANCE: ${Math.floor(score / 10)}`;
      ctx.fillText(finalScoreText, gameWidth / 2, gameHeight / 2 + 10);
    }
  }, [gameObjects, score, gameState, gameWidth, gameHeight, isMobile]);

  const resetGame = () => {
    setGameState('playing');
    setScore(0);
    setIsJumping(false);
    
    const groundY = gameHeight - 60;
    setGameObjects({
      player: { x: 50, y: groundY - 20, width: 20, height: 20, velocity: 0 },
      obstacles: [],
      clouds: gameObjects.clouds, // Keep clouds
    });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-400 via-green-400 to-blue-400 ${isMobile ? 'p-0' : 'p-4'}`}>
      {/* Game Title */}
      {!isMobile && (
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-white font-mono">ENDLESS RUNNER</h1>
        </div>
      )}

      {/* Game Canvas */}
      <div className={`flex justify-center ${isMobile ? 'h-screen' : 'mb-4'}`}>
        <div className="relative w-full h-full">
          <canvas
            ref={canvasRef}
            className={isMobile ? '' : 'border-2 border-green-500 rounded-lg'}
            style={{
              backgroundColor: '#87CEEB',
              width: `${gameWidth}px`,
              height: `${gameHeight}px`,
              touchAction: 'none', // Prevent scrolling on touch
              imageRendering: 'pixelated', // Keep crisp pixels for retro feel
            }}
            onTouchStart={isMobile ? handleTouchStart : undefined}
          />
          
          {(gameState === 'gameOver') && (
            <button
              onClick={resetGame}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-20 bg-green-500 text-white font-mono font-bold px-4 py-2 rounded hover:bg-green-600 transition-all duration-300"
            >
              RESTART
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideScrollGame;

// Required for Farcaster Mini Apps - forces dynamic rendering
export const dynamic = 'force-dynamic';