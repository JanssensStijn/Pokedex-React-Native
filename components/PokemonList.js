import { ActivityIndicator, FlatList, StyleSheet, Text, View} from "react-native";
import tw from "twrnc";
import { usePokemonListContext } from "../contexts/PokemonListProvider";
import PokemonListItem from "./PokemonListItem";

export default function PokemonList() {
  const { pokemons, loading } = usePokemonListContext();

  if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="red" />
          <Text style={styles.waitText}>Loading...</Text>
        </View>
      );
  }

  return (
      <FlatList
          data={pokemons}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <PokemonListItem pokemon={item} />}
      />
  );
}

const styles = StyleSheet.create({
    container: tw`flex-1 justify-center items-center bg-blue-100`,
    waitText: tw`text-black text-center text-lg`,
});