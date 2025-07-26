import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const socialLinks = [
    {
      icon: <GitHubIcon />,
      label: 'GitHub',
      url: 'https://github.com/yourusername',
    },
    {
      icon: <LinkedInIcon />,
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
    },
    {
      icon: <TwitterIcon />,
      label: 'Twitter',
      url: 'https://twitter.com/yourusername',
    },
    {
      icon: <EmailIcon />,
      label: 'Email',
      url: 'mailto:your.email@example.com',
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
            Get In Touch
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: 'text.secondary',
            }}
          >
            Let's work together on your next project
          </Typography>
        </motion.div>

        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card
                sx={{
                  backgroundColor: 'background.paper',
                  border: '1px solid rgba(100, 255, 218, 0.1)',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
                    Send Me a Message
                  </Typography>
                  
                  <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          label="Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgba(100, 255, 218, 0.3)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'primary.main',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'primary.main',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgba(100, 255, 218, 0.3)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'primary.main',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'primary.main',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgba(100, 255, 218, 0.3)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'primary.main',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'primary.main',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Message"
                          name="message"
                          multiline
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgba(100, 255, 218, 0.3)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'primary.main',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'primary.main',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          sx={{
                            backgroundColor: 'primary.main',
                            '&:hover': {
                              backgroundColor: 'primary.dark',
                            },
                          }}
                        >
                          Send Message
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card
                sx={{
                  backgroundColor: 'background.paper',
                  border: '1px solid rgba(100, 255, 218, 0.1)',
                  height: 'fit-content',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
                    Let's Connect
                  </Typography>
                  
                  <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', lineHeight: 1.6 }}>
                    I'm always interested in hearing about new opportunities and exciting projects. 
                    Feel free to reach out if you'd like to collaborate or just want to say hello!
                  </Typography>

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Email
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'primary.main' }}>
                      your.email@example.com
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Follow Me
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {socialLinks.map((social, index) => (
                        <IconButton
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            color: 'primary.main',
                            border: '1px solid rgba(0, 212, 255, 0.3)',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 212, 255, 0.1)',
                              borderColor: 'primary.main',
                            },
                          }}
                        >
                          {social.icon}
                        </IconButton>
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact; 