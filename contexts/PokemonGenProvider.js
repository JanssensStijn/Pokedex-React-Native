import{ createContext, useState, useEffect, useContext } from 'react';


export const PokemonGenContext = createContext();

export const PokemonGenProvider = ({ children }) => {
    const [pokemonGens, setPokemonGens] = useState([]);
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
        <PokemonGenContext.Provider value={{ pokemonGens, loading }}>
            {children}
        </PokemonGenContext.Provider>
    );
};

export const usePokemonGenContext = () => useContext(PokemonGenContext);