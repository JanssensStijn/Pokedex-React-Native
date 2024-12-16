import{ createContext, useState, useEffect, useContext } from 'react';


export const PokemonListContext = createContext();

export const PokemonListProvider = ({ children }) => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonGens = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/generation');
                const data = await response.json();
                setPokemonGens(data.results);
            } catch (error) {
                console.error('Error fetching pokemons:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonGens();
    }, []);

    return (
        <PokemonListContext.Provider value={{ pokemons, loading }}>
            {children}
        </PokemonListContext.Provider>
    );
};

export const usePokemonListContext = () => useContext(PokemonListContext);