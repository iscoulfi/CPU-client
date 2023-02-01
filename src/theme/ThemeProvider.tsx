import { ThemeContext, themes } from './ThemeContext';
import { useState, useEffect, ReactNode } from 'react';

const getTheme = () => {
  const theme = `${window?.localStorage?.getItem('theme')}`;
  if (Object.values(themes).includes(theme)) return theme;

  return themes.light;
};

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(getTheme);

  const set = (t: string) => {
    setTheme(t);
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, set }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
