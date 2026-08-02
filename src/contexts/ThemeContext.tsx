'use client';

import React, { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_CHANGE_EVENT = 'theme-change';

const isTheme = (value: string | null): value is Theme =>
  value === 'dark' || value === 'light';

const readTheme = (): Theme => {
  try {
    const savedTheme = localStorage.getItem('theme');
    if (isTheme(savedTheme)) return savedTheme;

    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  } catch {
    // localStorage / matchMedia can throw in restricted environments
  }

  return 'dark';
};

const getServerSnapshot = (): Theme => 'dark';

const subscribe = (onStoreChange: () => void) => {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === 'theme' || event.key === null) onStoreChange();
  };

  window.addEventListener('storage', handleStorage);
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
  };
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useSyncExternalStore(subscribe, readTheme, getServerSnapshot);

  // Sync the document class from React state — the correct use of an effect.
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';

    try {
      localStorage.setItem('theme', nextTheme);
    } catch {
      // Ignore write failures; the UI can still update for this session.
    }

    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
