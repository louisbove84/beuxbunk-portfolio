'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4a90e2',
    },
    background: {
      default: '#0a0a2e',
      paper: 'rgba(10, 10, 46, 0.8)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#4a90e2',
    },
  },
  typography: {
    fontFamily: '"Courier New", monospace',
    h1: {
      fontWeight: 900,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    body1: {
      fontFamily: '"Courier New", monospace',
      letterSpacing: '0.05em',
    },
    body2: {
      fontFamily: '"Courier New", monospace',
      letterSpacing: '0.05em',
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
          borderWidth: '2px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          borderWidth: '2px',
        },
      },
    },
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
} 