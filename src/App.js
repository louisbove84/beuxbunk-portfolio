import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4a90e2',
    },
    secondary: {
      main: '#ff6b6b',
    },
    background: {
      default: '#0a0a2e',
      paper: '#1a1a3a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#4a90e2',
    },
  },
  typography: {
    fontFamily: '"Courier New", "Monaco", "Consolas", monospace',
    h1: {
      fontWeight: 900,
      fontFamily: '"Courier New", monospace',
      letterSpacing: '0.1em',
    },
    h2: {
      fontWeight: 700,
      fontFamily: '"Courier New", monospace',
      letterSpacing: '0.05em',
    },
    h3: {
      fontWeight: 700,
      fontFamily: '"Courier New", monospace',
      letterSpacing: '0.05em',
    },
    h4: {
      fontWeight: 700,
      fontFamily: '"Courier New", monospace',
    },
    h5: {
      fontWeight: 600,
      fontFamily: '"Courier New", monospace',
    },
    h6: {
      fontWeight: 600,
      fontFamily: '"Courier New", monospace',
    },
    body1: {
      fontFamily: '"Courier New", monospace',
    },
    body2: {
      fontFamily: '"Courier New", monospace',
    },
    button: {
      fontFamily: '"Courier New", monospace',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          borderWidth: '3px',
          fontFamily: '"Courier New", monospace',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          borderWidth: '3px',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
