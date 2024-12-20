import { StyleSheet, View } from "react-native";
import tw from "twrnc";
import { useEffect } from "react";
import PokemonDetail from "../components/PokemonDetail";

export default function PokemonDetailsScreen({ route, navigation }) {
  const { pokemon } = route.params;

  useEffect(() => {
      navigation.setOptions({ title: '#'+ pokemon.id + ' '+ pokemon.name.toUpperCase() });
  }, [navigation, pokemon]);

  return (
    <View style={styles.container}>
      <PokemonDetail pokemon={pokemon}/>
    </View>
  );
}

const styles = StyleSheet.create({
    container: tw`h-full bg-gray-100`,
});