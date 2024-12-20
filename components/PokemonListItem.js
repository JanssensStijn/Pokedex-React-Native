import { Image, StyleSheet,Text,Pressable,View} from "react-native";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { NAV_POKEMON_DETAILS } from "../navigation_constants";
import { useNavigation } from "@react-navigation/native";
import { capitalizeFirstChar } from "../utils/utils";

export default function Pokemon({pokemon}) {
  const navigation = useNavigation();
  return (
    <View style={styles.pokemonContainer}>
      <Pressable style={[styles.center, styles.touchable]} onPress={() => navigation.navigate(NAV_POKEMON_DETAILS, {pokemon})}>
        {pokemon.found && <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image}/>}
        {!pokemon.found && <Image source={require("../assets/pokemon_not_found.png")} style={styles.image}/>}
        <View style={tw`flex-1`}>
          <Text style={styles.text}># {pokemon.id}</Text>
          <Text style={styles.text}>{capitalizeFirstChar(pokemon.name)}</Text>
        </View>
        <Icon name={"chevron-forward"} size={24} type="ionicon" style={styles.icon}/>
      </Pressable>
      <View style={styles.hairline}/>
    </View>
  );
}

const styles = StyleSheet.create({
    center: tw`items-center`,
    pokemonContainer: tw`w-full`, 
    hairline: {height: StyleSheet.hairlineWidth, backgroundColor: "gray"},
    touchable: tw`flex-row p-3 bg-blue-100`,
    text: tw`font-semibold text-lg`,
    icon: tw`p-3 bg-blue-200 rounded-full`,
    image: tw`w-30 h-30 mr-4`,
    center: tw`items-center justify-center`,
});