import React, { createContext, useContext, useState, useEffect } from 'react';
import { addToFavorites, getFavorites, removeFromFavorites } from '../utils/AsyncStorage';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const storedFavorites = await getFavorites();
      setFavorites(storedFavorites);
    };

    fetchFavorites();
  }, []);

  const addFavorite = async (pokemonId) => {
    await addToFavorites(pokemonId);
    setFavorites((prevFavorites) => [...prevFavorites, pokemonId]);
  };

  const removeFavorite = async (pokemonId) => {
    await removeFromFavorites(pokemonId);
    setFavorites((prevFavorites) => prevFavorites.filter(id => id !== pokemonId));
  };

  const isFavorite = (pokemonId) => {
    return favorites.includes(pokemonId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);