import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';

const About = () => {
  const skills = [
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'C++', level: 70 },
    { name: 'SQL', level: 75 },
  ];

  const experiences = [
    {
      title: 'Full-Stack Developer',
      company: 'Tech Company',
      period: '2023 - Present',
      description: 'Developed and maintained web applications using React and Node.js.',
    },
    {
      title: 'Software Engineer Intern',
      company: 'Startup',
      period: '2022 - 2023',
      description: 'Worked on backend development and database optimization.',
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
            About Me
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: 'text.secondary',
            }}
          >
            Get to know me better
          </Typography>
        </motion.div>

        <Grid container spacing={6}>
          {/* About Section */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
                Who I Am
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: 'text.secondary' }}>
                I'm a passionate full-stack developer with a strong foundation in both frontend and backend technologies. 
                I love solving complex problems and creating user-friendly applications that make a difference.
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: 'text.secondary' }}>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                or working on personal projects that challenge my skills and creativity.
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
                I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends 
                and best practices.
              </Typography>
            </motion.div>
          </Grid>

          {/* Skills Section */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
                Skills
              </Typography>
              {skills.map((skill, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {skill.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {skill.level}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={skill.level}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(0, 212, 255, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: 'primary.main',
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
              ))}
            </motion.div>
          </Grid>

          {/* Experience Section */}
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}>
                Experience
              </Typography>
              <Grid container spacing={3}>
                {experiences.map((exp, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card
                      sx={{
                        backgroundColor: 'background.paper',
                        border: '1px solid rgba(100, 255, 218, 0.1)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 5px 15px rgba(0, 212, 255, 0.1)',
                          transition: 'all 0.3s ease',
                        },
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                          {exp.title}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ mb: 1, color: 'primary.main' }}>
                          {exp.company}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                          {exp.period}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {exp.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About; 