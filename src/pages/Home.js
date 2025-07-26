import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
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
      title: 'Frontend Development',
      description: 'React, JavaScript, TypeScript, HTML/CSS',
    },
    {
      icon: <StorageIcon sx={{ fontSize: 40 }} />,
      title: 'Backend Development',
      description: 'Node.js, Python, C++, Database Design',
    },
    {
      icon: <BrushIcon sx={{ fontSize: 40 }} />,
      title: 'UI/UX Design',
      description: 'Material-UI, Responsive Design, User Experience',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', pt: 8 }}>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
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
                  fontWeight: 700,
                  mb: 2,
                  background: 'linear-gradient(45deg, #00d4ff, #ff6b6b)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Hi, I'm Louis
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: 'text.secondary',
                }}
              >
                Full-Stack Developer
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  color: 'text.secondary',
                  lineHeight: 1.6,
                }}
              >
                I build modern web applications and solve complex problems with code. 
                Passionate about creating user-friendly experiences and scalable solutions.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  component={RouterLink}
                  to="/projects"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  }}
                >
                  View My Work
                </Button>
                <Button
                  component={RouterLink}
                  to="/contact"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                      borderColor: 'primary.dark',
                      backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    },
                  }}
                >
                  Get In Touch
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
                  backgroundColor: 'rgba(0, 212, 255, 0.1)',
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid rgba(0, 212, 255, 0.3)',
                }}
              >
                <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                  Portfolio Image Placeholder
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Skills Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
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
              fontWeight: 600,
            }}
          >
            What I Do
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
                      backgroundColor: 'background.paper',
                      border: '1px solid rgba(100, 255, 218, 0.1)',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 30px rgba(0, 212, 255, 0.2)',
                        transition: 'all 0.3s ease',
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                      <Box sx={{ color: 'primary.main', mb: 2 }}>
                        {skill.icon}
                      </Box>
                      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                        {skill.title}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
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