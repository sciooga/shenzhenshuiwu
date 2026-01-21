import React, { createContext, useContext, useState, ReactNode } from 'react';
import { THEME, COLOR_POOLS } from './constants';

type ThemeType = typeof THEME;

interface ThemeContextType {
  theme: ThemeType;
  randomizeTheme: () => void;
  resetTheme: () => void;
  setCustomColors: (primary: string, secondary: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(THEME);

  const randomizeTheme = () => {
    const randomPrimary = COLOR_POOLS.primary[Math.floor(Math.random() * COLOR_POOLS.primary.length)];
    const randomSecondary = COLOR_POOLS.auxiliary[Math.floor(Math.random() * COLOR_POOLS.auxiliary.length)];
    
    let randomAccent = COLOR_POOLS.auxiliary[Math.floor(Math.random() * COLOR_POOLS.auxiliary.length)];
    if (randomAccent === randomSecondary) {
       randomAccent = COLOR_POOLS.auxiliary[Math.floor(Math.random() * COLOR_POOLS.auxiliary.length)];
    }

    setTheme(prev => ({
      ...prev,
      primary: randomPrimary,
      secondary: randomSecondary,
      accent: randomAccent,
    }));
  };

  const setCustomColors = (primary: string, secondary: string) => {
    setTheme(prev => ({
      ...prev,
      primary: primary.startsWith('#') ? primary : `#${primary}`,
      secondary: secondary.startsWith('#') ? secondary : `#${secondary}`,
    }));
  };

  const resetTheme = () => {
    setTheme(THEME);
  };

  return (
    <ThemeContext.Provider value={{ theme, randomizeTheme, resetTheme, setCustomColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};