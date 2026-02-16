"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Theme = 'blue' | 'green' | 'secondaryBlue';

interface CareerThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  getThemeColors: () => {
    primary: string;
    dark: string;
    darkest: string;
    light: string;
    lightest: string;
    secondary: string;
  };
}

const CareerThemeContext = createContext<CareerThemeContextType | undefined>(undefined);

export const CareerThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('green');

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'blue') return 'green';
      if (prev === 'green') return 'secondaryBlue';
      return 'blue';
    });
  };

  const getThemeColors = () => {
    if (theme === 'green') {
      return {
        primary: '#00C798',      // Accent Green
        dark: '#00A67E',          // Dark Green
        darkest: '#007A5E',       // Darkest Green
        light: '#B8E6D6',         // Light Green
        lightest: '#E8F5E8',      // Secondary Green (lightest)
        secondary: '#E8F5E8',     // Secondary Green
      };
    } else if (theme === 'secondaryBlue') {
      return {
        primary: '#E8F2FF',       // Secondary Blue
        dark: '#B8D4F0',          // Darker Secondary Blue
        darkest: '#8BB0E0',       // Darkest Secondary Blue
        light: '#F0F7FF',         // Light Secondary Blue
        lightest: '#F8FBFF',      // Lightest Secondary Blue
        secondary: '#E8F2FF',     // Secondary Blue
      };
    } else {
      return {
        primary: '#186BBF',       // Accent Blue
        dark: '#125A9F',          // Dark Blue
        darkest: '#0D4A7A',       // Deep Blue
        light: '#4A8FD4',         // Light Blue
        lightest: '#B8D4F0',      // Very light blue
        secondary: '#B8D4F0',     // Very light blue
      };
    }
  };

  return (
    <CareerThemeContext.Provider value={{ theme, toggleTheme, getThemeColors }}>
      {children}
    </CareerThemeContext.Provider>
  );
};

export const useCareerTheme = () => {
  const context = useContext(CareerThemeContext);
  if (!context) {
    throw new Error('useCareerTheme must be used within CareerThemeProvider');
  }
  return context;
};