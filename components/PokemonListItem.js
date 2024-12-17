import { Image, StyleSheet,Text,TouchableOpacity,View} from "react-native";
import tw from "twrnc";
import { Icon } from "react-native-elements";

export default function Pokemon({pokemon}) {
  return (
    <View style={styles.pokemonContainer}>
      <TouchableOpacity style={[styles.center, styles.touchable]}>
        {pokemon.found && <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image}/>}
        {!pokemon.found && <Image source={require("../assets/pokemon_not_found.png")} style={styles.image}/>}
        <View style={tw`flex-1`}>
          <Text style={styles.text}># {pokemon.id}</Text>
          <Text style={styles.text}>{pokemon.name}</Text>
        </View>
        <TouchableOpacity>
          <Icon name={"chevron-forward"} size={24} type="ionicon" style={styles.icon}/>
        </TouchableOpacity>
      </TouchableOpacity>
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