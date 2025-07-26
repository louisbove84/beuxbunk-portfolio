import React from 'react';
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
      {/* Rocket Ship */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: 80,
          height: 120,
          zIndex: 2,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '20px solid transparent',
            borderRight: '20px solid transparent',
            borderBottom: '40px solid #ff6b6b',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 40,
            height: 80,
            backgroundColor: '#4a90e2',
            borderRadius: '20px 20px 0 0',
          },
        }}
      />

      {/* Astronaut */}
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          left: '5%',
          width: 60,
          height: 80,
          zIndex: 2,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 30,
            height: 30,
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            border: '3px solid #333',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 40,
            height: 50,
            backgroundColor: '#ffffff',
            borderRadius: '20px 20px 0 0',
            border: '3px solid #333',
          },
        }}
      />

      <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 3 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
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
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                SPACE ENGINEER
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: '#4a90e2',
                  textShadow: '2px 2px 0px #ffffff',
                  fontFamily: '"Courier New", monospace',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  fontSize: { xs: '1.5rem', md: '2rem' },
                }}
              >
                LOUIS BOVE
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  color: '#ffffff',
                  lineHeight: 1.6,
                  fontFamily: '"Courier New", monospace',
                  textShadow: '1px 1px 0px #333',
                  fontSize: { xs: '1rem', md: '1.2rem' },
                }}
              >
                MISSION: BUILDING SCALABLE APPLICATIONS AND SOLVING COMPLEX ALGORITHMIC CHALLENGES IN THE DIGITAL UNIVERSE.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  component={RouterLink}
                  to="/projects"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: '#ff6b6b',
                    border: '3px solid #ffffff',
                    color: '#ffffff',
                    fontFamily: '"Courier New", monospace',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
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
                  size="large"
                  sx={{
                    borderColor: '#4a90e2',
                    borderWidth: '3px',
                    color: '#4a90e2',
                    fontFamily: '"Courier New", monospace',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
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
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: 400,
                  backgroundColor: 'rgba(74, 144, 226, 0.1)',
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid #4a90e2',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 100,
                    height: 100,
                    background: 'radial-gradient(circle, #ff6b6b 0%, transparent 70%)',
                    borderRadius: '50%',
                    animation: 'pulse 2s ease-in-out infinite',
                  },
                  '@keyframes pulse': {
                    '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.5 },
                    '50%': { transform: 'translate(-50%, -50%) scale(1.2)', opacity: 0.8 },
                  },
                }}
              >
                <Typography 
                  variant="h4" 
                  sx={{ 
                    color: '#ffffff', 
                    fontFamily: '"Courier New", monospace',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    textShadow: '2px 2px 0px #333',
                    zIndex: 2,
                    position: 'relative',
                  }}
                >
                  SPACE STATION
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Skills Section */}
      <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              mb: 6,
              fontWeight: 900,
              color: '#ffffff',
              textShadow: '3px 3px 0px #ff6b6b',
              fontFamily: '"Courier New", monospace',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            MISSION CAPABILITIES
          </Typography>
          
          <Grid container spacing={4}>
            {skills.map((skill, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      backgroundColor: 'rgba(10, 10, 46, 0.8)',
                      border: '3px solid #4a90e2',
                      borderRadius: 2,
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 30px rgba(74, 144, 226, 0.5)',
                        borderColor: '#ff6b6b',
                        transition: 'all 0.3s ease',
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                      <Box sx={{ color: '#ff6b6b', mb: 2 }}>
                        {skill.icon}
                      </Box>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          mb: 2, 
                          fontWeight: 700,
                          color: '#ffffff',
                          fontFamily: '"Courier New", monospace',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {skill.title}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: '#4a90e2',
                          fontFamily: '"Courier New", monospace',
                          fontSize: '0.9rem',
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
      </Container>
    </Box>
  );
};

export default Home; 