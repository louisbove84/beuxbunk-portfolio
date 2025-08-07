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

const GameRouter = () => {
  const [gameType, setGameType] = useState<'selection' | 'spaceinvaders' | 'runner'>('selection');

  useEffect(() => {
    // Check URL parameters to determine which game to show
    const urlParams = new URLSearchParams(window.location.search);
    const game = urlParams.get('game');
    
    if (game === 'runner') {
      setGameType('runner');
    } else if (game === 'spaceinvaders') {
      setGameType('spaceinvaders');
    } else {
      // No game parameter - show selection screen
      setGameType('selection');
    }
  }, []);

  if (gameType === 'selection') {
    return <GameSelectionScreen onSelectGame={setGameType} />;
  }

  if (gameType === 'runner') {
    return <ThisIsFineGame />;
  }

  if (gameType === 'spaceinvaders') {
    return <SpaceInvadersGame />;
  }

  return null;
};

const GameSelectionScreen = ({ onSelectGame }: { onSelectGame: (game: 'spaceinvaders' | 'runner') => void }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initialize SDK for Farcaster
    const initializeSDK = async () => {
      try {
        console.log('Calling sdk.actions.ready()');
        await sdk.actions.ready();
        console.log('SDK ready - game selection screen visible in Farcaster');
      } catch (error) {
        console.error('SDK ready error:', error);
      }
    };

    initializeSDK();

    // Detect mobile
    const updateDimensions = () => {
      const mobile = window.innerWidth <= 768 || 'ontouchstart' in window;
      setIsMobile(mobile);
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 ${isMobile ? 'p-4' : 'p-8'} flex items-center justify-center`}>
      <div className="text-center max-w-md">
        <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6 font-mono">
          MEME GAMES HUB
        </h1>
        <p className="text-lg text-blue-300 mb-12 font-mono">
          Choose Your Chaos! 🎮
        </p>
        
        <div className="flex flex-col gap-6">
          <button
            onClick={() => onSelectGame('spaceinvaders')}
            className="bg-red-500 text-white px-8 py-6 rounded-lg font-mono font-bold text-xl hover:bg-red-600 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            🚀 SPACE INVADERS
          </button>
          
          <button
            onClick={() => onSelectGame('runner')}
            className="bg-green-500 text-white px-8 py-6 rounded-lg font-mono font-bold text-xl hover:bg-green-600 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            🔥 THIS IS FINE
          </button>
        </div>
        
        <p className="text-sm text-gray-400 mt-8 font-mono">
          Classic arcade action vs. endless runner survival
        </p>
      </div>
    </div>
  );
};

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
  const [gameWidth, setGameWidth] = useState(320);
  const [gameHeight, setGameHeight] = useState(320);

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
    
    // Update player position
    setGameObjects(prev => ({
      ...prev,
      player: { 
        x: gameWidth / 2 - 10, 
        y: gameHeight - 120, // Moved higher to make room for controls
        width: 20, 
        height: 20 
      }
    }));
    
    // Initialize enemies, centered
    const enemyWidth = 20;
    const enemyHeight = 15;
    const colGap = 15;
    const rowGap = 30;
    const numCols = 8;
    const numRows = 3;
    const enemiesSpan = (numCols - 1) * (enemyWidth + colGap) + enemyWidth;
    const leftMargin = (gameWidth - enemiesSpan) / 2;
    
    const enemies: GameObject[] = [];
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        enemies.push({
          x: col * (enemyWidth + colGap) + leftMargin,
          y: row * (enemyHeight + rowGap) + 50,
          width: enemyWidth,
          height: enemyHeight,
          direction: 1,
        });
      }
    }
    
    setGameObjects(prev => ({ ...prev, enemies }));
  }, [gameWidth, gameHeight]);

  // Auto-shooting for mobile
  useEffect(() => {
    if (gameState !== 'playing' || !isMobile) return;

    const autoShoot = setInterval(() => {
      setGameObjects(prev => ({
        ...prev,
        bullets: [
          ...prev.bullets,
          {
            x: prev.player.x + prev.player.width / 2 - 1,
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
        const enemyWidth = 20; // Consistent with init
        if (enemies.some((e: GameObject) => e.x <= 0 || e.x >= gameWidth - enemyWidth)) {
          enemies.forEach((enemy: GameObject) => {
            enemy.direction = (enemy.direction || 1) * -1;
            enemy.y += 10;
          });
        }

        // Check if enemies reached bottom
        if (enemies.some((e: GameObject) => e.y + e.height >= prev.player.y)) {
          setGameState('gameOver');
          return prev;
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
        })).filter((bullet: GameObject) => bullet.y < gameHeight);

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
  }, [gameState, gameWidth, gameHeight]);

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
                x: Math.min(gameWidth - prev.player.width, prev.player.x + 10),
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
                    x: prev.player.x + prev.player.width / 2 - 1,
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
  }, [gameState, isMobile, gameWidth]);

  // Mobile touch controls
  const handleTouchMove = (e: React.TouchEvent) => {
    if (gameState !== 'playing') return;
    
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const touchX = touch.clientX - rect.left; // Logical CSS pixels, no * dpr

    // Move player to touch position (constrained to canvas width)
    setGameObjects(prev => ({
      ...prev,
      player: {
        ...prev.player,
        x: Math.max(0, Math.min(gameWidth - prev.player.width, touchX - prev.player.width / 2)),
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
    ctx.fillRect(0, 0, gameWidth, gameHeight);
    
    // Draw touch indicator below player (mobile only)
    if (isMobile) {
      // Draw semi-transparent circle below ship
      const circleX = gameObjects.player.x + gameObjects.player.width / 2;
      const circleY = gameObjects.player.y + gameObjects.player.height + 30; // Reduced offset
      
      ctx.fillStyle = 'rgba(74, 144, 226, 0.2)';
      ctx.beginPath();
      ctx.arc(circleX, circleY, 30, 0, 2 * Math.PI); // Reduced radius
      ctx.fill();
      
      // Draw dashed circle border
      ctx.strokeStyle = 'rgba(74, 144, 226, 0.4)';
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]); // Reset line dash
      
      // Draw small hand icon in the center of circle
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = '20px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('👆', circleX, circleY + 6);
    }
    
    // Draw player (simple ship shape)
    ctx.fillStyle = '#4a90e2';
    ctx.beginPath();
    ctx.moveTo(gameObjects.player.x + gameObjects.player.width / 2, gameObjects.player.y);
    ctx.lineTo(gameObjects.player.x, gameObjects.player.y + gameObjects.player.height);
    ctx.lineTo(gameObjects.player.x + gameObjects.player.width, gameObjects.player.y + gameObjects.player.height);
    ctx.closePath();
    ctx.fill();
    
    // Draw enemies (simple invader shape)
    ctx.fillStyle = '#ff6b6b';
    gameObjects.enemies.forEach((enemy: GameObject) => {
      const w = enemy.width;
      const h = enemy.height;
      const x = enemy.x;
      const y = enemy.y;
      // Body
      ctx.fillRect(x + w * 0.1, y + h * 0.2, w * 0.8, h * 0.4);
      ctx.fillRect(x + w * 0.3, y, w * 0.4, h * 0.2);
      // Legs
      ctx.fillRect(x, y + h * 0.6, w * 0.2, h * 0.4);
      ctx.fillRect(x + w * 0.8, y + h * 0.6, w * 0.2, h * 0.4);
      // Arms
      ctx.fillRect(x + w * 0.2, y + h * 0.6, w * 0.2, h * 0.2);
      ctx.fillRect(x + w * 0.6, y + h * 0.6, w * 0.2, h * 0.2);
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
    
    // Draw score (centered at top)
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px "Courier New"';
    const scoreText = `SCORE: ${score}`;
    ctx.fillText(scoreText, gameWidth / 2 - ctx.measureText(scoreText).width / 2, 30);
    
    // Draw game over screen
    if (gameState === 'gameOver') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, gameWidth, gameHeight);
      ctx.fillStyle = '#ff6b6b';
      ctx.font = '24px "Courier New"';
      const gameOverText = 'GAME OVER';
      ctx.fillText(gameOverText, gameWidth / 2 - ctx.measureText(gameOverText).width / 2, gameHeight / 2 - 20);
      ctx.font = '16px "Courier New"';
      const finalScoreText = `FINAL SCORE: ${score}`;
      ctx.fillText(finalScoreText, gameWidth / 2 - ctx.measureText(finalScoreText).width / 2, gameHeight / 2 + 10);
    }
    
    if (gameState === 'won') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, gameWidth, gameHeight);
      ctx.fillStyle = '#4a90e2';
      ctx.font = '24px "Courier New"';
      const wonText = 'MISSION COMPLETE!';
      ctx.fillText(wonText, gameWidth / 2 - ctx.measureText(wonText).width / 2, gameHeight / 2 - 20);
      ctx.font = '16px "Courier New"';
      const scoreTextWon = `SCORE: ${score}`;
      ctx.fillText(scoreTextWon, gameWidth / 2 - ctx.measureText(scoreTextWon).width / 2, gameHeight / 2 + 10);
    }
  }, [gameObjects, score, gameState, gameWidth, gameHeight, isMobile]);

  const resetGame = () => {
    setGameState('playing');
    setScore(0);
    
    // Reinitialize enemies
    const enemyWidth = 20;
    const enemyHeight = 15;
    const colGap = 15;
    const rowGap = 30;
    const numCols = 8;
    const numRows = 3;
    const enemiesSpan = (numCols - 1) * (enemyWidth + colGap) + enemyWidth;
    const leftMargin = (gameWidth - enemiesSpan) / 2;
    
    const enemies: GameObject[] = [];
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        enemies.push({
          x: col * (enemyWidth + colGap) + leftMargin,
          y: row * (enemyHeight + rowGap) + 50,
          width: enemyWidth,
          height: enemyHeight,
          direction: 1,
        });
      }
    }
    
    setGameObjects({
      player: { x: gameWidth / 2 - 10, y: gameHeight - 120, width: 20, height: 20 },
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
              width: `${gameWidth}px`,
              height: `${gameHeight}px`,
              touchAction: 'none', // Prevent scrolling on touch
              imageRendering: 'pixelated', // Keep crisp pixels for retro feel
            }}
            onTouchStart={isMobile ? handleTouchStart : undefined}
            onTouchMove={isMobile ? handleTouchMove : undefined}
          />
          
          {(gameState === 'gameOver' || gameState === 'won') && (
            <button
              onClick={resetGame}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-20 bg-red-500 text-white font-mono font-bold px-4 py-2 rounded hover:bg-red-600 transition-all duration-300"
            >
              RESTART
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// This Is Fine Runner Game Component
const ThisIsFineGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState('playing');
  const [score, setScore] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [gameObjects, setGameObjects] = useState({
    player: { x: 50, y: 0, width: 40, height: 50, velocityY: 0, isJumping: false, isDucking: false },
    obstacles: [] as Array<{x: number; y: number; width: number; height: number; type: string}>,
    collectibles: [] as Array<{x: number; y: number; width: number; height: number; type: string}>,
  });
  const [gameWidth, setGameWidth] = useState(320);
  const [gameHeight, setGameHeight] = useState(320);
  const gravity = 0.5;
  const jumpPower = -10;
  const scrollSpeed = 2;

  // Initialize the game when component mounts
  useEffect(() => {
    console.log('This Is Fine game initialized');

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

    // Update player position
    const playerHeight = 50;
    setGameObjects(prev => ({
      ...prev,
      player: {
        x: 50,
        y: gameHeight - playerHeight - 50, // Ground level
        width: 40,
        height: playerHeight,
        velocityY: 0,
        isJumping: false,
        isDucking: false
      }
    }));
  }, [gameWidth, gameHeight]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      setGameObjects(prev => {
        const { player, obstacles: prevObstacles, collectibles: prevCollectibles } = prev;

        // Apply gravity and jumping
        player.velocityY += gravity;
        player.y += player.velocityY;

        // Ground collision
        const groundLevel = gameHeight - 50 - (player.isDucking ? 25 : player.height);
        if (player.y > groundLevel) {
          player.y = groundLevel;
          player.velocityY = 0;
          player.isJumping = false;
        }

        // Duck height adjustment
        if (player.isDucking) {
          player.height = 25;
        } else {
          player.height = 50;
        }

        // Move obstacles and collectibles left (scroll)
        // eslint-disable-next-line prefer-const
        let obstacles = prevObstacles.map(obs => ({ ...obs, x: obs.x - scrollSpeed }))
          .filter(obs => obs.x + obs.width > 0);

        // eslint-disable-next-line prefer-const
        let collectibles = prevCollectibles.map(col => ({ ...col, x: col.x - scrollSpeed }))
          .filter(col => col.x + col.width > 0);

        // Spawn new obstacles and collectibles
        if (Math.random() < 0.05) { // Chance to spawn flame on ground
          obstacles.push({
            x: gameWidth,
            y: gameHeight - 50 - 30,
            width: 20,
            height: 30,
            type: 'flame'
          });
        }
        if (Math.random() < 0.03) { // Chance to spawn debris from ceiling
          obstacles.push({
            x: gameWidth,
            y: 0,
            width: 30,
            height: 40,
            type: 'debris'
          });
        }
        if (Math.random() < 0.02) { // Chance to spawn coffee
          collectibles.push({
            x: gameWidth,
            y: Math.random() * (gameHeight - 150) + 50,
            width: 20,
            height: 20,
            type: 'coffee'
          });
        }

        // Check collisions with obstacles
        const playerHit = obstacles.some(obs =>
          player.x < obs.x + obs.width &&
          player.x + player.width > obs.x &&
          player.y < obs.y + obs.height &&
          player.y + player.height > obs.y
        );

        if (playerHit) {
          setGameState('gameOver');
        }

        // Check collectibles
        const newCollectibles = collectibles.filter(col => {
          const collected = player.x < col.x + col.width &&
            player.x + player.width > col.x &&
            player.y < col.y + col.height &&
            player.y + player.height > col.y;

          if (collected) {
            setScore(prev => prev + 10);
            return false;
          }
          return true;
        });

        // Increase score over time
        setScore(prev => prev + 1);

        return {
          player,
          obstacles,
          collectibles: newCollectibles
        };
      });
    }, 30);

    return () => clearInterval(gameLoop);
  }, [gameState, gameWidth, gameHeight]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      if (e.key === 'ArrowDown') {
        setGameObjects(prev => ({
          ...prev,
          player: { ...prev.player, isDucking: true }
        }));
      }
      if (e.key === ' ' || e.key === 'ArrowUp') {
        setGameObjects(prev => {
          if (!prev.player.isJumping) {
            return {
              ...prev,
              player: { ...prev.player, velocityY: jumpPower, isJumping: true }
            };
          }
          return prev;
        });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        setGameObjects(prev => ({
          ...prev,
          player: { ...prev.player, isDucking: false }
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, jumpPower]);

  // Mobile touch controls
  const handleTouchStart = (e: React.TouchEvent) => {
    if (gameState !== 'playing') return;

    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const touchY = touch.clientY - rect.top;

    if (touchY < gameHeight / 2) {
      // Upper half: jump
      setGameObjects(prev => {
        if (!prev.player.isJumping) {
          return {
            ...prev,
            player: { ...prev.player, velocityY: jumpPower, isJumping: true }
          };
        }
        return prev;
      });
    } else {
      // Lower half: duck
      setGameObjects(prev => ({
        ...prev,
        player: { ...prev.player, isDucking: true }
      }));
    }
  };

  const handleTouchEnd = () => {
    setGameObjects(prev => ({
      ...prev,
      player: { ...prev.player, isDucking: false }
    }));
  };

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#0a0a2e';
    ctx.fillRect(0, 0, gameWidth, gameHeight);

    // Draw background (simple burning room)
    ctx.fillStyle = '#8B4513'; // Brown floor
    ctx.fillRect(0, gameHeight - 50, gameWidth, 50);

    // Draw player (simple dog with hat)
    const { player } = gameObjects;
    const dogX = player.x;
    const dogY = player.y;
    const dogW = player.width;
    const dogH = player.height;

    // Body
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(dogX + dogW * 0.2, dogY + dogH * 0.4, dogW * 0.6, dogH * 0.6);

    // Head
    ctx.beginPath();
    ctx.arc(dogX + dogW * 0.5, dogY + dogH * 0.3, dogH * 0.25, 0, 2 * Math.PI);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(dogX + dogW * 0.35, dogY + dogH * 0.25, dogH * 0.05, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(dogX + dogW * 0.65, dogY + dogH * 0.25, dogH * 0.05, 0, 2 * Math.PI);
    ctx.fill();

    // Hat
    ctx.fillStyle = '#A0522D';
    ctx.fillRect(dogX + dogW * 0.3, dogY, dogW * 0.4, dogH * 0.1);
    ctx.fillRect(dogX + dogW * 0.2, dogY + dogH * 0.1, dogW * 0.6, dogH * 0.05);

    // Legs (simple)
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(dogX, dogY + dogH * 0.7, dogW * 0.2, dogH * 0.3);
    ctx.fillRect(dogX + dogW * 0.8, dogY + dogH * 0.7, dogW * 0.2, dogH * 0.3);

    // Draw obstacles
    gameObjects.obstacles.forEach(obs => {
      if (obs.type === 'flame') {
        ctx.fillStyle = '#FF4500';
        ctx.beginPath();
        ctx.moveTo(obs.x, obs.y + obs.height);
        ctx.lineTo(obs.x + obs.width / 2, obs.y);
        ctx.lineTo(obs.x + obs.width, obs.y + obs.height);
        ctx.closePath();
        ctx.fill();
      } else if (obs.type === 'debris') {
        ctx.fillStyle = '#808080';
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      }
    });

    // Draw collectibles (coffee cups)
    gameObjects.collectibles.forEach(col => {
      ctx.fillStyle = '#D2B48C';
      ctx.fillRect(col.x, col.y, col.width, col.height);
      ctx.fillStyle = '#000000';
      ctx.fillRect(col.x + col.width * 0.7, col.y + col.height / 2, col.width * 0.3, col.height / 2); // Handle
    });

    // Draw score
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px "Courier New"';
    const scoreText = `SCORE: ${score}`;
    ctx.fillText(scoreText, gameWidth / 2 - ctx.measureText(scoreText).width / 2, 30);

    // Draw game over screen
    if (gameState === 'gameOver') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, gameWidth, gameHeight);
      ctx.fillStyle = '#ff6b6b';
      ctx.font = '24px "Courier New"';
      const gameOverText = 'THIS IS NOT FINE!';
      ctx.fillText(gameOverText, gameWidth / 2 - ctx.measureText(gameOverText).width / 2, gameHeight / 2 - 20);
      ctx.font = '16px "Courier New"';
      const finalScoreText = `FINAL SCORE: ${score}`;
      ctx.fillText(finalScoreText, gameWidth / 2 - ctx.measureText(finalScoreText).width / 2, gameHeight / 2 + 10);
    }
  }, [gameObjects, score, gameState, gameWidth, gameHeight]);

  const resetGame = () => {
    setGameState('playing');
    setScore(0);

    setGameObjects({
      player: { x: 50, y: gameHeight - 50 - 50, width: 40, height: 50, velocityY: 0, isJumping: false, isDucking: false },
      obstacles: [],
      collectibles: [],
    });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 ${isMobile ? 'p-0' : 'p-4'}`}>
      {/* Game Title */}
      {!isMobile && (
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-white font-mono">THIS IS FINE</h1>
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
              width: `${gameWidth}px`,
              height: `${gameHeight}px`,
              touchAction: 'none', // Prevent scrolling on touch
              imageRendering: 'pixelated', // Keep crisp pixels for retro feel
            }}
            onTouchStart={isMobile ? handleTouchStart : undefined}
            onTouchEnd={isMobile ? handleTouchEnd : undefined}
          />

          {gameState === 'gameOver' && (
            <button
              onClick={resetGame}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-20 bg-red-500 text-white font-mono font-bold px-4 py-2 rounded hover:bg-red-600 transition-all duration-300"
            >
              RESTART
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameRouter;

// Required for Farcaster Mini Apps - forces dynamic rendering
export const dynamic = 'force-dynamic';
