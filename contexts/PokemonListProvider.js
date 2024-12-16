import{ createContext, useState, useEffect, useContext } from 'react';


export const PokemonListContext = createContext();

export const PokemonListProvider = ({ children, genUrl }) => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await fetch(genUrl);
                const data = await response.json();
                setPokemons(data.results);
            } catch (error) {
                console.error('Error fetching pokemons:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemons();
    }, []);

    return (
        <PokemonListContext.Provider value={{ pokemons, loading }}>
            {children}
        </PokemonListContext.Provider>
    );
};

export const usePokemonListContext = () => useContext(PokemonListContext);