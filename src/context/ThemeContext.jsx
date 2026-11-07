import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = [
  {
    id: 'lavender-dream',
    name: 'Lavender Dream',
    tagline: 'Cozy, Creative & Focused',
    description: 'Our signature pastel palette featuring soothing lavender tones and electric indigo accents.',
    isDefault: true,
    colors: {
      bg: '#F8F5FF',
      primary: '#8870E8',
      secondary: '#DCD0FF',
      accent: '#F1C8E8',
      text: '#29233C',
    },
  },
  {
    id: 'peach-blossom',
    name: 'Peach Blossom',
    tagline: 'Warm, Uplifting & Optimistic',
    description: 'Warm apricot and soft coral hues designed to bring energy and warmth to your scholarship journey.',
    colors: {
      bg: '#FFF7F2',
      primary: '#ED927B',
      secondary: '#FFD7C8',
      accent: '#F4B6C8',
      text: '#392A30',
    },
  },
  {
    id: 'sage-garden',
    name: 'Sage Garden',
    tagline: 'Grounded, Calm & Balanced',
    description: 'Botanical greens and earthy olive undertones for relaxed, anxiety-free study and planning.',
    colors: {
      bg: '#F4F8F2',
      primary: '#789C80',
      secondary: '#D6E6D5',
      accent: '#D7CBA9',
      text: '#263A2E',
    },
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    tagline: 'Crisp, Clear & Expansive',
    description: 'Cool coastal blues and seafoam accents that inspire clear thinking and global ambitions.',
    colors: {
      bg: '#F0F8FC',
      primary: '#428DB5',
      secondary: '#BDE2F3',
      accent: '#B8DCCF',
      text: '#243746',
    },
  },
  {
    id: 'butter-cream',
    name: 'Butter Cream',
    tagline: 'Vintage, Editorial & Warm',
    description: 'Warm cream, honey gold, and toasted vanilla inspired by timeless vintage student stationery.',
    colors: {
      bg: '#FFFBEF',
      primary: '#D5A94F',
      secondary: '#F5E4A8',
      accent: '#F3C6A6',
      text: '#443A2B',
    },
  },
  {
    id: 'midnight-mode',
    name: 'Midnight Mode',
    tagline: 'Deep, Immersive & Focused',
    description: 'Rich midnight navy with luminous violet and neon lime accents for late-night application marathons.',
    colors: {
      bg: '#151527',
      primary: '#A995FF',
      secondary: '#383354',
      accent: '#C7E99B',
      text: '#F5F2FF',
    },
  },
];

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('grantly_theme');
      if (saved && THEMES.some(t => t.id === saved)) {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'lavender-dream';
  });

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('grantly_theme', currentTheme);
    } catch (e) {
      console.warn('Could not persist theme to localStorage', e);
    }
  }, [currentTheme]);

  const activeThemeMeta = THEMES.find(t => t.id === currentTheme) || THEMES[0];

  const cycleTheme = () => {
    const currentIndex = THEMES.findIndex(t => t.id === currentTheme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    setCurrentTheme(THEMES[nextIndex].id);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        setTheme: setCurrentTheme,
        themes: THEMES,
        activeThemeMeta,
        cycleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
