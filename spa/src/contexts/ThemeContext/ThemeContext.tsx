import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ThemeProvider } from "./contexts/ThemeContext";

// --- DEFINIÇÕES DE TEMA ---
interface Theme {
  name: string;
  backgroundColor: string; // Cor para o fundo da página (ex: #f4f7f9)
  cardColor: string;       // Cor para os cartões/boxes (ex: white)
  textColor: string;       // Cor do texto principal
}

const lightTheme: Theme = {
  name: 'light',
  backgroundColor: '#f4f7f9', // Azul/Cinza claro (cor mesclada)
  cardColor: '#ffffff',       // Branco
  textColor: '#333333',
};

const darkTheme: Theme = {
  name: 'dark',
  backgroundColor: '#1b263b', // Azul escuro/Marinho (Nova cor de fundo)
  cardColor: '#2f4163',       // Azul um pouco mais claro para cards
  textColor: '#ffffff',
};

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

// Criação do Contexto
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Provider Component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Inicializa o tema lendo do localStorage ou usando o padrão light
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('siteTheme');
    return savedTheme === 'dark' ? darkTheme : lightTheme;
  });

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme.name === 'light' ? darkTheme : lightTheme;
      localStorage.setItem('siteTheme', newTheme.name);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook customizado para usar o tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};