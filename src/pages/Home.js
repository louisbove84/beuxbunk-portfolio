import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import BrushIcon from '@mui/icons-material/Brush';

// Space Invaders Game Component
const SpaceInvadersGame = () => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('playing');
  const [score, setScore] = useState(0);
  const [gameObjects, setGameObjects] = useState({
    player: { x: 150, y: 280, width: 20, height: 20 },
    bullets: [],
    enemies: [],
    enemyBullets: [],
  });

  // Initialize game
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 320;
    canvas.height = 320;
    
    // Initialize enemies
    const enemies = [];
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
        const enemies = prev.enemies.map(enemy => ({
          ...enemy,
          x: enemy.x + enemy.direction * 0.5,
        }));

        // Change direction when hitting edges
        if (enemies.some(e => e.x <= 0 || e.x >= 300)) {
          enemies.forEach(enemy => {
            enemy.direction *= -1;
            enemy.y += 10;
          });
        }

        // Move bullets
        const bullets = prev.bullets.map(bullet => ({
          ...bullet,
          y: bullet.y - 3,
        })).filter(bullet => bullet.y > 0);

        // Move enemy bullets
        const enemyBullets = prev.enemyBullets.map(bullet => ({
          ...bullet,
          y: bullet.y + 2,
        })).filter(bullet => bullet.y < 320);

        // Check collisions
        const newBullets = bullets.filter(bullet => {
          const hitEnemy = enemies.find(enemy => 
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
        const newEnemies = enemies.filter(enemy => {
          return !bullets.some(bullet => 
            bullet.x < enemy.x + enemy.width &&
            bullet.x + bullet.width > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.y + bullet.height > enemy.y
          );
        });

        // Random enemy shooting
        const newEnemyBullets = [...enemyBullets];
        if (Math.random() < 0.02 && newEnemies.length > 0) {
          const randomEnemy = newEnemies[Math.floor(Math.random() * newEnemies.length)];
          newEnemyBullets.push({
            x: randomEnemy.x + randomEnemy.width / 2,
            y: randomEnemy.y + randomEnemy.height,
            width: 2,
            height: 8,
          });
        }

        // Check if player is hit
        const playerHit = newEnemyBullets.some(bullet => 
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
    const handleKeyDown = (e) => {
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
    
    // Clear canvas
    ctx.fillStyle = '#0a0a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw stars
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 50; i++) {
      ctx.fillRect(
        (i * 7) % canvas.width,
        (i * 13) % canvas.height,
        1,
        1
      );
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
    gameObjects.enemies.forEach(enemy => {
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
    
    // Draw bullets
    ctx.fillStyle = '#ffffff';
    gameObjects.bullets.forEach(bullet => {
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
    
    // Draw enemy bullets
    ctx.fillStyle = '#ff6b6b';
    gameObjects.enemyBullets.forEach(bullet => {
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
    const enemies = [];
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
    <Box sx={{ textAlign: 'center' }}>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 1,
          color: '#ffffff',
          fontFamily: '"Courier New", monospace',
          fontWeight: 700,
          textTransform: 'uppercase',
          fontSize: { xs: '0.9rem', sm: '1rem' },
        }}
      >
        SPACE INVADERS
      </Typography>
      <Box sx={{ position: 'relative', display: 'inline-block' }}>
        <canvas
          ref={canvasRef}
          style={{
            border: '2px solid #4a90e2',
            borderRadius: 0,
            backgroundColor: '#0a0a2e',
            maxWidth: '100%',
            height: 'auto',
          }}
        />
        {(gameState === 'gameOver' || gameState === 'won') && (
          <Button
            onClick={resetGame}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, 50px)',
              backgroundColor: '#ff6b6b',
              color: '#ffffff',
              fontFamily: '"Courier New", monospace',
              fontWeight: 700,
              textTransform: 'uppercase',
              border: '2px solid #ffffff',
              padding: '6px 12px',
              minWidth: '100px',
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              zIndex: 10,
              '&:hover': {
                backgroundColor: '#ff5252',
                transform: 'translate(-50%, 50px) scale(1.05)',
                boxShadow: '0 0 20px rgba(255, 107, 107, 0.5)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            RESTART
          </Button>
        )}
      </Box>
      <Typography 
        variant="body2" 
        sx={{ 
          mt: 1,
          color: '#4a90e2',
          fontFamily: '"Courier New", monospace',
          fontSize: { xs: '0.6rem', sm: '0.7rem' },
          mb: 0.5,
        }}
      >
        USE ARROWS TO MOVE, SPACE TO SHOOT
      </Typography>
      <Typography 
        variant="body2" 
        sx={{ 
          color: '#ff6b6b',
          fontFamily: '"Courier New", monospace',
          fontSize: { xs: '0.5rem', sm: '0.6rem' },
        }}
      >
        CLICK RESTART TO PLAY AGAIN
      </Typography>
    </Box>
  );
};

const Home = () => {
  const skills = [
    {
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      title: 'SOFTWARE DEVELOPMENT',
      description: 'Python, JavaScript, React, C++, Full-Stack Development',
    },
    {
      icon: <StorageIcon sx={{ fontSize: 40 }} />,
      title: 'DATA & AI',
      description: 'Machine Learning, Data Analysis, Algorithm Development',
    },
    {
      icon: <BrushIcon sx={{ fontSize: 40 }} />,
      title: 'PROBLEM SOLVING',
      description: 'Complex Algorithm Design, System Architecture, Optimization',
    },
  ];

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        pt: 8,
        background: 'linear-gradient(180deg, #0a0a2e 0%, #1a1a3a 50%, #0a0a2e 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(2px 2px at 20px 30px, #ffffff, transparent),
            radial-gradient(2px 2px at 40px 70px, #ffffff, transparent),
            radial-gradient(1px 1px at 90px 40px, #ffffff, transparent),
            radial-gradient(1px 1px at 130px 80px, #ffffff, transparent),
            radial-gradient(2px 2px at 160px 30px, #ffffff, transparent)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 100px',
          animation: 'twinkle 4s ease-in-out infinite alternate',
          zIndex: 1,
        },
        '@keyframes twinkle': {
          '0%': { opacity: 0.3 },
          '100%': { opacity: 0.8 },
        },
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4, position: 'relative', zIndex: 3 }}>
        <Grid container spacing={3} alignItems="flex-start">
          {/* Left Column - Hero Content */}
          <Grid item xs={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  mb: 2,
                  color: '#ffffff',
                  textShadow: '3px 3px 0px #ff6b6b, 6px 6px 0px #4a90e2',
                  fontFamily: '"Courier New", monospace',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '2.8rem' },
                }}
              >
                SPACE ENGINEER
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: '#4a90e2',
                  textShadow: '2px 2px 0px #ffffff',
                  fontFamily: '"Courier New", monospace',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.6rem' },
                }}
              >
                LOUIS BOVE
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  color: '#ffffff',
                  lineHeight: 1.5,
                  fontFamily: '"Courier New", monospace',
                  textShadow: '1px 1px 0px #333',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                }}
              >
                MISSION: BUILDING SCALABLE APPLICATIONS AND SOLVING COMPLEX ALGORITHMIC CHALLENGES IN THE DIGITAL UNIVERSE.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                <Button
                  component={RouterLink}
                  to="/projects"
                  variant="contained"
                  size="medium"
                  sx={{
                    backgroundColor: '#ff6b6b',
                    border: '3px solid #ffffff',
                    color: '#ffffff',
                    fontFamily: '"Courier New", monospace',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    '&:hover': {
                      backgroundColor: '#ff5252',
                      transform: 'scale(1.05)',
                      boxShadow: '0 0 20px rgba(255, 107, 107, 0.5)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  START MISSION
                </Button>
                <Button
                  component={RouterLink}
                  to="/contact"
                  variant="outlined"
                  size="medium"
                  sx={{
                    borderColor: '#4a90e2',
                    borderWidth: '3px',
                    color: '#4a90e2',
                    fontFamily: '"Courier New", monospace',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    '&:hover': {
                      borderColor: '#ffffff',
                      backgroundColor: 'rgba(74, 144, 226, 0.1)',
                      transform: 'scale(1.05)',
                      boxShadow: '0 0 20px rgba(74, 144, 226, 0.5)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  CONTACT HQ
                </Button>
              </Box>

              {/* Skills Section - Moved up */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    mb: 3,
                    fontWeight: 900,
                    color: '#ffffff',
                    textShadow: '3px 3px 0px #ff6b6b',
                    fontFamily: '"Courier New", monospace',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
                  }}
                >
                  MISSION CAPABILITIES
                </Typography>
                
                <Grid container spacing={2}>
                  {skills.map((skill, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      >
                        <Card
                          sx={{
                            height: '180px',
                            backgroundColor: 'rgba(10, 10, 46, 0.8)',
                            border: '2px solid #4a90e2',
                            borderRadius: 1,
                            maxWidth: '280px',
                            mx: 'auto',
                            '&:hover': {
                              transform: 'translateY(-3px)',
                              boxShadow: '0 8px 25px rgba(74, 144, 226, 0.5)',
                              borderColor: '#ff6b6b',
                              transition: 'all 0.3s ease',
                            },
                          }}
                        >
                          <CardContent sx={{ textAlign: 'center', py: 2.5, px: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Box sx={{ color: '#ff6b6b', mb: 1.5 }}>
                              {React.cloneElement(skill.icon, { sx: { fontSize: { xs: 28, sm: 32, md: 36 } } })}
                            </Box>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                mb: 1.5, 
                                fontWeight: 700,
                                color: '#ffffff',
                                fontFamily: '"Courier New", monospace',
                                letterSpacing: '0.05em',
                                fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                              }}
                            >
                              {skill.title}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: '#4a90e2',
                                fontFamily: '"Courier New", monospace',
                                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                                lineHeight: 1.4,
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              {skill.description}
                            </Typography>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </motion.div>
          </Grid>
          
          {/* Right Column - Game */}
          <Grid item xs={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <SpaceInvadersGame />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 