import { StyleSheet, View } from "react-native";
import tw from "twrnc";
import { PokemonListProvider } from "../contexts/PokemonListProvider";
import { useEffect } from "react";
import PokemonList from "../components/PokemonList";

export default function PokemonListScreen({ route, navigation }) {
  const { genUrl, genName } = route.params;

  useEffect(() => {
      navigation.setOptions({ title: genName.toUpperCase() });
  }, [navigation, genName]);

  return (
    <PokemonListProvider genUrl={genUrl}>
      <View style={styles.container}>
        <PokemonList/>
      </View>
    </PokemonListProvider>
  );
}

const styles = StyleSheet.create({
    container: tw`h-full bg-gray-100`,
});