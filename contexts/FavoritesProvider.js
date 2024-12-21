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

  const getFavoritePokemons = async () => {
      const pokemonDataList = await Promise.all(
        favorites.map(async (pokemonId) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`); // get the pokemon id from the specimen url instead of by name => more reliable for data about the pokemon
          if(response.ok){
              const pokemonData = await response.json();
              return { ...pokemonData, found: true };
          }
          else{
              console.error('Error fetching pokemons:', pokemon.name);
              return {name: pokemon.name, found: false};
          }
        })
      );
      pokemonDataList.sort((a, b) => a.id - b.id);
      return pokemonDataList;
  }

  return (
    <FavoritesContext.Provider value={{ getFavoritePokemons, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);