import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  CardMedia,
} from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

const Projects = () => {
  const projects = [
    {
      title: 'C++ Practice Exercises',
      description: 'A comprehensive collection of C++ programming exercises covering object-oriented programming, memory management, inheritance, and modern C++ features.',
      technologies: ['C++', 'Object-Oriented Programming', 'Memory Management'],
      github: 'https://github.com/yourusername/cpp-practice',
      live: null,
      image: '/api/placeholder/400/250',
    },
    {
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with React and Material-UI, featuring smooth animations and a clean design.',
      technologies: ['React', 'Material-UI', 'JavaScript', 'CSS'],
      github: 'https://github.com/yourusername/portfolio',
      live: 'https://beuxbunk.com',
      image: '/api/placeholder/400/250',
    },
    {
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce application with user authentication, product management, and payment processing.',
      technologies: ['Node.js', 'React', 'MongoDB', 'Stripe'],
      github: 'https://github.com/yourusername/ecommerce',
      live: 'https://your-ecommerce-app.com',
      image: '/api/placeholder/400/250',
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, user roles, and project organization.',
      technologies: ['React', 'Node.js', 'Socket.io', 'PostgreSQL'],
      github: 'https://github.com/yourusername/task-manager',
      live: 'https://your-task-app.com',
      image: '/api/placeholder/400/250',
    },
    {
      title: 'Weather Dashboard',
      description: 'A weather application that displays current conditions and forecasts with interactive maps and location services.',
      technologies: ['JavaScript', 'API Integration', 'CSS3', 'HTML5'],
      github: 'https://github.com/yourusername/weather-app',
      live: 'https://your-weather-app.com',
      image: '/api/placeholder/400/250',
    },
    {
      title: 'Machine Learning Model',
      description: 'A machine learning model for image classification using TensorFlow and Python, with a web interface for predictions.',
      technologies: ['Python', 'TensorFlow', 'Flask', 'Machine Learning'],
      github: 'https://github.com/yourusername/ml-project',
      live: null,
      image: '/api/placeholder/400/250',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', pt: 8 }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 2,
              fontWeight: 700,
            }}
          >
            My Projects
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: 'text.secondary',
            }}
          >
            Here are some of the projects I've worked on
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'background.paper',
                    border: '1px solid rgba(100, 255, 218, 0.1)',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 30px rgba(0, 212, 255, 0.2)',
                      transition: 'all 0.3s ease',
                    },
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      height: 200,
                      backgroundColor: 'rgba(0, 212, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottom: '1px solid rgba(100, 255, 218, 0.1)',
                    }}
                  >
                    <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                      Project Image
                    </Typography>
                  </CardMedia>
                  
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                      {project.description}
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      {project.technologies.map((tech, techIndex) => (
                        <Chip
                          key={techIndex}
                          label={tech}
                          size="small"
                          sx={{
                            mr: 1,
                            mb: 1,
                            backgroundColor: 'rgba(0, 212, 255, 0.1)',
                            color: 'primary.main',
                            border: '1px solid rgba(0, 212, 255, 0.3)',
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                  
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      startIcon={<GitHubIcon />}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: 'primary.main',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 212, 255, 0.1)',
                        },
                      }}
                    >
                      Code
                    </Button>
                    {project.live && (
                      <Button
                        startIcon={<LaunchIcon />}
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: 'primary.main',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 212, 255, 0.1)',
                          },
                        }}
                      >
                        Live Demo
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Projects; 