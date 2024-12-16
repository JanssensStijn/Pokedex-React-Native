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
                const pokemonDataList = await Promise.all(
                    data.pokemon_species.map(async (pokemon) => {
                        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.url.split('/').slice(-2, -1)[0]}`); // get the pokemon id from the specimen url instead of by name => more reliable for data about the pokemon
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
                setPokemons(pokemonDataList);
                
            } catch (error) {
                console.error('Error fetching pokemons:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemons();
    }, [genUrl]);

    return (
        <PokemonListContext.Provider value={{ pokemons, loading }}>
            {children}
        </PokemonListContext.Provider>
    );
};

export const usePokemonListContext = () => {
    const context = useContext(PokemonListContext);
    if (!context) {
        throw new Error('usePokemonListContext must be used within a PokemonListProvider');
    }
    return context;
};