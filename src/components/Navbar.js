import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const navItems = [
  { name: 'MISSION CONTROL', path: '/' },
  { name: 'PROJECTS', path: '/projects' },
  { name: 'CREW INFO', path: '/about' },
  { name: 'COMMUNICATIONS', path: '/contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography 
        variant="h6" 
        sx={{ 
          my: 2,
          fontFamily: '"Courier New", monospace',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#ff6b6b',
        }}
      >
        SPACE ENGINEER
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} component={RouterLink} to={item.path}>
            <ListItemText 
              primary={item.name}
              sx={{
                color: location.pathname === item.path ? '#ff6b6b' : '#ffffff',
                textAlign: 'center',
                fontFamily: '"Courier New", monospace',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                '& .MuiListItemText-primary': {
                  fontFamily: '"Courier New", monospace',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: 'rgba(10, 10, 46, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '3px solid #4a90e2',
          boxShadow: '0 4px 20px rgba(74, 144, 226, 0.3)',
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: '#ff6b6b',
              fontWeight: 900,
              fontFamily: '"Courier New", monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              textShadow: '2px 2px 0px #333',
              '&:hover': {
                color: '#ffffff',
                textShadow: '2px 2px 0px #ff6b6b',
                transition: 'all 0.3s ease',
              },
            }}
          >
            SPACE ENGINEER
          </Typography>
          
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                color: '#ffffff',
                border: '2px solid #4a90e2',
                '&:hover': {
                  backgroundColor: 'rgba(74, 144, 226, 0.2)',
                  borderColor: '#ff6b6b',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    color: location.pathname === item.path ? '#ff6b6b' : '#ffffff',
                    fontFamily: '"Courier New", monospace',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    border: location.pathname === item.path ? '2px solid #ff6b6b' : '2px solid transparent',
                    borderRadius: 0,
                    '&:hover': {
                      color: '#ff6b6b',
                      backgroundColor: 'rgba(255, 107, 107, 0.1)',
                      borderColor: '#ff6b6b',
                      transform: 'scale(1.05)',
                      transition: 'all 0.3s ease',
                    },
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            backgroundColor: '#0a0a2e',
            borderRight: '3px solid #4a90e2',
          },
        }}
      >
        {drawer}
      </Drawer>
      
      <Toolbar /> {/* Spacer for fixed AppBar */}
    </>
  );
};

export default Navbar; 