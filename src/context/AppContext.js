import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'favorites'

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('royalKnightsFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('royalKnightsFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (artId) => {
    setFavorites(prev => 
      prev.includes(artId) 
        ? prev.filter(id => id !== artId)
        : [...prev, artId]
    );
  };

  const value = {
    favorites,
    toggleFavorite,
    searchTerm,
    setSearchTerm,
    activeFilter,
    setActiveFilter
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}