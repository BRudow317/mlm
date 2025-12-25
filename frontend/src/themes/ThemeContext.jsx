import { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the "Channel" src\themes\ThemeContext.jsx
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // 1. Add State to hold the current theme
    const [theme, setTheme] = useState("dark");

    // 2. Helper function to toggle it
    const toggleTheme = () => {
        setTheme((curr) => (curr === "dark" ? "light" : "dark"));
    };

  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
};

// Returns 
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export function ThemeDomSync() {
  const { theme } = useTheme();

  useEffect(() => {
    // Apply theme globally
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return null;
};