import { FlatList, StyleSheet, Text, View } from "react-native";
import tw from "twrnc";
import { useFavorites } from "../contexts/FavoritesProvider";
import { useEffect, useState } from "react";
import PokemonListItem from "../components/PokemonListItem";

export default function PokemonFavoritesScreen({ navigation }) {
  //get favorites from the context FavoritesProvider
  const { getFavoritePokemons } = useFavorites();
  const [favoritePokemons, setFavoritePokemons] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: "FAVORITES" });
}, [navigation]);

  useEffect(() => {
  const fetchFavoritePokemons = async () => {
    const pokemons = await getFavoritePokemons();
    setFavoritePokemons(pokemons);
  };

  fetchFavoritePokemons();
}, [getFavoritePokemons]);

return (
  <>
    {favoritePokemons.length === 0 ? (
      <View style={styles.container}>
        <Text style={styles.noFavoritesText}>No favorites yet</Text>
      </View>
    ) : (
      <FlatList
        data={favoritePokemons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PokemonListItem pokemon={item} />}
      />
    )}</>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
noFavoritesText: {
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center',
},
});