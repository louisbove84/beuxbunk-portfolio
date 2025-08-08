'use client';

import React, { useState, useEffect, useRef } from 'react';

const ThisIsFineGame: React.FC = () => {
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

    // Detect if we're on mobile and set dimensions (no SDK initialization here)
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
  }, [gameState, gameWidth, gameHeight, gravity, scrollSpeed]);

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

export default ThisIsFineGame;