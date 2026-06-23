import { createContext, useContext, useEffect, useState } from 'react';
import type { ThemeMode } from '../src/types';
import type { ReactNode } from 'react';

const ThemeContext = createContext<ThemeMode>('dark');

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeMode>('dark');

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', theme);
  }, [theme]);

  return <ThemeContext value={theme}>{children}</ThemeContext>;
};

const useTheme = () => {
  return useContext(ThemeContext);
};

export { ThemeProvider, useTheme };
