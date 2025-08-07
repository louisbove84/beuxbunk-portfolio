'use client';

import React, { useState, useEffect, useRef } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  direction?: number;
}

interface GameObjects {
  player: GameObject;
  bullets: GameObject[];
  enemies: GameObject[];
  enemyBullets: GameObject[];
}

const SpaceInvadersGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState('playing');
  const [score, setScore] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [gameObjects, setGameObjects] = useState<GameObjects>({
    player: { x: 150, y: 280, width: 20, height: 20 },
    bullets: [],
    enemies: [],
    enemyBullets: [],
  });

  // Initialize the game when component mounts
  useEffect(() => {
    console.log('Space Invaders game initialized');
    
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
    
    // Detect if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size based on device
    if (isMobile) {
      // Set high resolution for crisp graphics
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      // Set actual canvas size (internal resolution)
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      // Scale the drawing context to match device pixel ratio
      ctx.scale(dpr, dpr);
      
      // Set CSS size to fill screen
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      
      // Update player position for mobile (bottom of screen with room)
      setGameObjects(prev => ({
        ...prev,
        player: { 
          x: window.innerWidth / 2 - 10, 
          y: window.innerHeight - 80, // 80px from bottom for touch area
          width: 20, 
          height: 20 
        }
      }));
    } else {
      canvas.width = 320;
      canvas.height = 320;
    }
    
    // Initialize enemies
    const enemies: GameObject[] = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 8; col++) {
        enemies.push({
          x: col * 35 + 20,
          y: row * 30 + 50,
          width: 20,
          height: 15,
          direction: 1,
        });
      }
    }
    
    setGameObjects(prev => ({ ...prev, enemies }));
  }, []);

  // Auto-shooting for mobile
  useEffect(() => {
    if (gameState !== 'playing' || !isMobile) return;

    const autoShoot = setInterval(() => {
      setGameObjects(prev => ({
        ...prev,
        bullets: [
          ...prev.bullets,
          {
            x: prev.player.x + prev.player.width / 2,
            y: prev.player.y,
            width: 2,
            height: 8,
          },
        ],
      }));
    }, 300); // Auto-shoot every 300ms on mobile

    return () => clearInterval(autoShoot);
  }, [gameState, isMobile]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      setGameObjects(prev => {
        // Move enemies
        const enemies = prev.enemies.map((enemy: GameObject) => ({
          ...enemy,
          x: enemy.x + (enemy.direction || 1) * 0.5,
        }));

        // Change direction when hitting edges
        if (enemies.some((e: GameObject) => e.x <= 0 || e.x >= 300)) {
          enemies.forEach((enemy: GameObject) => {
            enemy.direction = (enemy.direction || 1) * -1;
            enemy.y += 10;
          });
        }

        // Move bullets
        const bullets = prev.bullets.map((bullet: GameObject) => ({
          ...bullet,
          y: bullet.y - 3,
        })).filter((bullet: GameObject) => bullet.y > 0);

        // Move enemy bullets
        const enemyBullets = prev.enemyBullets.map((bullet: GameObject) => ({
          ...bullet,
          y: bullet.y + 2,
        })).filter((bullet: GameObject) => bullet.y < 320);

        // Enemy shooting logic
        const newEnemyBullets = [...enemyBullets];
        if (Math.random() < 0.02 && enemies.length > 0) { // 2% chance per frame
          const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
          newEnemyBullets.push({
            x: randomEnemy.x + randomEnemy.width / 2 - 2,
            y: randomEnemy.y + randomEnemy.height,
            width: 4,
            height: 8,
          });
        }

        // Check collisions
        const newBullets = bullets.filter((bullet: GameObject) => {
          const hitEnemy = enemies.find((enemy: GameObject) => 
            bullet.x < enemy.x + enemy.width &&
            bullet.x + bullet.width > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.y + bullet.height > enemy.y
          );
          
          if (hitEnemy) {
            setScore(prev => prev + 10);
            return false;
          }
          return true;
        });

        // Remove hit enemies
        const newEnemies = enemies.filter((enemy: GameObject) => {
          return !bullets.some((bullet: GameObject) => 
            bullet.x < enemy.x + enemy.width &&
            bullet.x + bullet.width > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.y + bullet.height > enemy.y
          );
        });

        // Check if player is hit
        const playerHit = newEnemyBullets.some((bullet: GameObject) => 
          bullet.x < prev.player.x + prev.player.width &&
          bullet.x + bullet.width > prev.player.x &&
          bullet.y < prev.player.y + prev.player.height &&
          bullet.y + bullet.height > prev.player.y
        );

        if (playerHit) {
          setGameState('gameOver');
        }

        // Check win condition
        if (newEnemies.length === 0) {
          setGameState('won');
        }

        return {
          ...prev,
          bullets: newBullets,
          enemies: newEnemies,
          enemyBullets: newEnemyBullets,
        };
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, [gameState]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      // Prevent default behavior for game controls
      if (e.key === ' ' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
      }

      setGameObjects(prev => {
        switch (e.key) {
          case 'ArrowLeft':
            return {
              ...prev,
              player: {
                ...prev.player,
                x: Math.max(0, prev.player.x - 10),
              },
            };
          case 'ArrowRight':
            return {
              ...prev,
              player: {
                ...prev.player,
                x: Math.min(300, prev.player.x + 10),
              },
            };
          case ' ':
            // Only allow manual shooting on desktop
            if (!isMobile) {
              return {
                ...prev,
                bullets: [
                  ...prev.bullets,
                  {
                    x: prev.player.x + prev.player.width / 2,
                    y: prev.player.y,
                    width: 2,
                    height: 8,
                  },
                ],
              };
            }
            return prev;
          default:
            return prev;
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, isMobile]);

  // Mobile touch controls
  const handleTouchMove = (e: React.TouchEvent) => {
    if (gameState !== 'playing') return;
    
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const touchX = (touch.clientX - rect.left) * scaleX;

    // Move player to touch position (constrained to canvas width)
    setGameObjects(prev => ({
      ...prev,
      player: {
        ...prev.player,
        x: Math.max(0, Math.min(canvas.width - prev.player.width, touchX - prev.player.width / 2)),
      },
    }));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleTouchMove(e);
  };

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.fillStyle = '#0a0a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw touch indicator below player (mobile only)
    if (isMobile) {
      // Draw semi-transparent circle below ship
      const circleX = gameObjects.player.x + gameObjects.player.width / 2;
      const circleY = gameObjects.player.y + gameObjects.player.height + 50;
      
      ctx.fillStyle = 'rgba(74, 144, 226, 0.2)';
      ctx.beginPath();
      ctx.arc(circleX, circleY, 40, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw dashed circle border
      ctx.strokeStyle = 'rgba(74, 144, 226, 0.4)';
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]); // Reset line dash
      
      // Draw small hand icon in the center of circle
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = '24px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('👆', circleX, circleY + 8);
    }
    
    // Draw player
    ctx.fillStyle = '#4a90e2';
    ctx.fillRect(
      gameObjects.player.x,
      gameObjects.player.y,
      gameObjects.player.width,
      gameObjects.player.height
    );
    
    // Draw enemies
    ctx.fillStyle = '#ff6b6b';
    gameObjects.enemies.forEach((enemy: GameObject) => {
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
    
    // Draw bullets
    ctx.fillStyle = '#ffffff';
    gameObjects.bullets.forEach((bullet: GameObject) => {
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
    
    // Draw enemy bullets
    ctx.fillStyle = '#ff6b6b';
    gameObjects.enemyBullets.forEach((bullet: GameObject) => {
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
    
    // Draw score
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px "Courier New"';
    ctx.fillText(`SCORE: ${score}`, 10, 30);
    
    // Draw game over screen
    if (gameState === 'gameOver') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ff6b6b';
      ctx.font = '24px "Courier New"';
      ctx.fillText('GAME OVER', 80, 150);
      ctx.font = '16px "Courier New"';
      ctx.fillText(`FINAL SCORE: ${score}`, 80, 180);
    }
    
    if (gameState === 'won') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#4a90e2';
      ctx.font = '24px "Courier New"';
      ctx.fillText('MISSION COMPLETE!', 60, 150);
      ctx.font = '16px "Courier New"';
      ctx.fillText(`SCORE: ${score}`, 80, 180);
    }
  }, [gameObjects, score, gameState]);

  const resetGame = () => {
    setGameState('playing');
    setScore(0);
    
    // Reinitialize enemies
    const enemies: GameObject[] = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 8; col++) {
        enemies.push({
          x: col * 35 + 20,
          y: row * 30 + 50,
          width: 20,
          height: 15,
          direction: 1,
        });
      }
    }
    
    setGameObjects({
      player: { x: 150, y: 280, width: 20, height: 20 },
      bullets: [],
      enemies: enemies,
      enemyBullets: [],
    });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 ${isMobile ? 'p-0' : 'p-4'}`}>
      {/* Game Title */}
      {!isMobile && (
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-white font-mono">SPACE INVADERS</h1>
        </div>
      )}

      {/* Game Canvas */}
      <div className={`flex justify-center ${isMobile ? 'h-screen' : 'mb-4'}`}>
        <div className="relative w-full h-full">
          <canvas
            ref={canvasRef}
            className={isMobile ? '' : 'border-2 border-blue-500 rounded-lg'}
            style={{
              backgroundColor: '#0a0a2e',
              width: isMobile ? '100vw' : '320px',
              height: isMobile ? '100vh' : '320px',
              touchAction: 'none', // Prevent scrolling on touch
              imageRendering: 'pixelated', // Keep crisp pixels for retro feel
            }}
            onTouchStart={isMobile ? handleTouchStart : undefined}
            onTouchMove={isMobile ? handleTouchMove : undefined}
          />
          

          
          {(gameState === 'gameOver' || gameState === 'won') && (
            <button
              onClick={resetGame}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-8 bg-red-500 text-white font-mono font-bold px-4 py-2 rounded hover:bg-red-600 transition-all duration-300"
            >
              RESTART
            </button>
          )}
        </div>
      </div>


    </div>
  );
};

export default SpaceInvadersGame;

// Required for Farcaster Mini Apps - forces dynamic rendering
export const dynamic = 'force-dynamic';