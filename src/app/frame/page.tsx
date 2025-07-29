'use client';

import React, { useState, useEffect, useRef } from 'react';

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

const SpaceInvadersFrame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState('playing');
  const [score, setScore] = useState(0);
  const [gameObjects, setGameObjects] = useState<GameObjects>({
    player: { x: 150, y: 280, width: 20, height: 20 },
    bullets: [],
    enemies: [],
    enemyBullets: [],
  });

  // Initialize game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size for frame
    canvas.width = 400;
    canvas.height = 400;
    
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
        if (enemies.some((e: GameObject) => e.x <= 0 || e.x >= 360)) {
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
        })).filter((bullet: GameObject) => bullet.y < 400);

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

        // Check bullet-enemy collisions
        const newEnemies = enemies.filter((enemy: GameObject) => {
          return !bullets.some((bullet: GameObject) => {
            return bullet.x < enemy.x + enemy.width &&
                   bullet.x + bullet.width > enemy.x &&
                   bullet.y < enemy.y + enemy.height &&
                   bullet.y + bullet.height > enemy.y;
          });
        });

        // Remove bullets that hit enemies
        const newBullets = bullets.filter((bullet: GameObject) => {
          return !enemies.some((enemy: GameObject) => {
            return bullet.x < enemy.x + enemy.width &&
                   bullet.x + bullet.width > enemy.x &&
                   bullet.y < enemy.y + enemy.height &&
                   bullet.y + bullet.height > enemy.y;
          });
        });

        // Check enemy bullet-player collision
        const playerHit = newEnemyBullets.some((bullet: GameObject) => {
          return bullet.x < prev.player.x + prev.player.width &&
                 bullet.x + bullet.width > prev.player.x &&
                 bullet.y < prev.player.y + prev.player.height &&
                 bullet.y + bullet.height > prev.player.y;
        });

        if (playerHit) {
          setGameState('gameOver');
        }

        // Update score
        const destroyedEnemies = enemies.length - newEnemies.length;
        if (destroyedEnemies > 0) {
          setScore(prev => prev + destroyedEnemies * 10);
        }

        // Check if enemies reached bottom
        if (newEnemies.some((enemy: GameObject) => enemy.y > 250)) {
          setGameState('gameOver');
        }

        // Check if all enemies destroyed
        if (newEnemies.length === 0) {
          setGameState('victory');
        }

        return {
          ...prev,
          enemies: newEnemies,
          bullets: newBullets,
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
                x: Math.min(380, prev.player.x + 10),
              },
            };
          case ' ':
            // Shoot bullet
            const newBullet: GameObject = {
              x: prev.player.x + prev.player.width / 2 - 2,
              y: prev.player.y,
              width: 4,
              height: 8,
            };
            return {
              ...prev,
              bullets: [...prev.bullets, newBullet],
            };
          default:
            return prev;
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#0a0a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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

    // Draw UI
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px "Courier New"';
    ctx.fillText(`Score: ${score}`, 10, 30);

    if (gameState === 'gameOver') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ff6b6b';
      ctx.font = '24px "Courier New"';
      ctx.fillText('GAME OVER', canvas.width / 2 - 80, canvas.height / 2);
      ctx.font = '16px "Courier New"';
      ctx.fillText(`Final Score: ${score}`, canvas.width / 2 - 60, canvas.height / 2 + 30);
    } else if (gameState === 'victory') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#4a90e2';
      ctx.font = '24px "Courier New"';
      ctx.fillText('VICTORY!', canvas.width / 2 - 60, canvas.height / 2);
      ctx.font = '16px "Courier New"';
      ctx.fillText(`Score: ${score}`, canvas.width / 2 - 40, canvas.height / 2 + 30);
    }
  }, [gameObjects, score, gameState]);

  const resetGame = () => {
    setGameState('playing');
    setScore(0);
    
    // Re-initialize enemies
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
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a2e] to-[#1a1a3a] flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4 font-mono">
          SPACE ENGINEER FRAME
        </h1>
        <p className="text-blue-400 mb-6 font-mono">
          Use arrows to move, space to shoot
        </p>
        
        <div className="relative inline-block">
          <canvas
            ref={canvasRef}
            className="border-2 border-blue-500 rounded-none bg-[#0a0a2e]"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
        
        <div className="mt-4 space-x-4">
          <button
            onClick={resetGame}
            tabIndex={gameState === 'playing' ? -1 : 0}
            className="px-6 py-2 bg-red-500 text-white font-mono font-bold border-2 border-white hover:bg-red-600 transition-all duration-300 hover:scale-105"
          >
            RESTART
          </button>
        </div>
        
        <p className="text-sm text-gray-400 mt-4 font-mono">
          Louis Bove - Space Engineer Portfolio
        </p>
      </div>
    </div>
  );
};

export default SpaceInvadersFrame; 