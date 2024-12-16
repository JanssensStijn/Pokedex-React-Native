import { FlatList, Image, StyleSheet,Text,TouchableOpacity,View} from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { PokemonListProvider, usePokemonListContext } from "../contexts/PokemonListProvider";
import { Icon } from "react-native-elements";
import { useEffect } from "react";

function Pokemon({pokemon}) {
  const navigation = useNavigation();
  console.log("pokemon: ");
  console.log(pokemon);
  return (
    <View style={styles.placeContainer}>
      <TouchableOpacity style={[styles.center, styles.touchable]}>
        {pokemon.sprites && <Image source={pokemon.sprites.front_default} style={styles.image}/>}
        {!pokemon.sprites && <Image source={require("../assets/pokeball.png")} style={styles.image}/>}
        <View style={tw`flex-1`}>
          <Text style={styles.name}>{pokemon.name}</Text>
        </View>
        <TouchableOpacity>
          <Icon name={"chevron-forward"} size={24} type="ionicon" style={styles.icon}/>
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.hairline}/>
    </View>
  );
}

function PokemonList() {
  const { pokemons, loading } = usePokemonListContext();

  if (loading) {
      return (
          <View style={styles.center}>
              <Text>Loading...</Text>
          </View>
      );
  }

  return (
      <FlatList
          data={pokemons}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <Pokemon pokemon={item} />}
      />
  );
}

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
    center: tw`items-center`,
    container: tw`h-full bg-gray-100`,
    placeContainer: tw`w-full`,
    hairline: {height: StyleSheet.hairlineWidth, backgroundColor: "gray"},
    touchable2: (isSelected) => tw`flex-row p-3 ${isSelected ? "bg-purple-100" : ""}`,
    touchable: tw`flex-row p-3 bg-blue-100`,
    name: tw`font-semibold text-lg`,
    description: tw`text-gray-500`,
    mr: tw`mr-4`,
    icon: tw`p-3 bg-blue-200 rounded-full`,
    background: tw`h-full bg-blue-700`,
    buttonView: tw`w-full mt-4`,
    button: tw`p-3 bg-red-700 rounded-full w-50`,
    buttonText: tw`text-white text-center text-lg`,
    image: tw`w-30 h-30 mr-4`,
    center: tw`items-center justify-center`,
});