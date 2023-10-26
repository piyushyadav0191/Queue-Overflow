"use client";
import React from "react";

type Props = {
  children: React.ReactNode;
};
interface ThemeContextProps {
  mode: string;
  setMode: (mode: string) => void;
}

const ThemeContext = React.createContext<ThemeContextProps | undefined>(
  undefined
);

const ThemeProvider = ({ children }: Props) => {
  const [mode, setMode] = React.useState("");

  const handleThemeChnage = () => {
    if (mode === "dark") {
      setMode("light");
      document.documentElement.classList.add("light");
    } else {
      setMode("dark");
      document.documentElement.classList.add("dark");
    }
  };

  React.useEffect(() => {
    handleThemeChnage();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
