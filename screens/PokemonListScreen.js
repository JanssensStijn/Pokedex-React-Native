import { FlatList, StyleSheet,Text,TouchableOpacity,View} from "react-native";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { NAV_PLACE_DETAILS } from "../navigation_constants";

function Pokemon({}) {
  const navigation = useNavigation();
  return (
      <View style={styles.placeContainer}>
        
        <TouchableOpacity style={[styles.center, styles.touchable(place.isSelected)]} onPress={() => toggleIsSelected(place)}>
          <PlaceIcon place={place}/>
          <View style={tw`flex-1`}>
              <Text style={styles.name}>{place.name}</Text>
              <Text style={styles.description}>{place.description}</Text>
              
          </View>
          <TouchableOpacity onPress={() => navigation.navigate(NAV_PLACE_DETAILS, {place})}>
            <Icon name={"chevron-forward"} size={24} type="ionicon" style={styles.icon}/>
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.hairline}/>
      </View>
  );
}

export default function PokemonListScreen() {
  const {genUrl} = route.params;
  const {pokemons} = usePokemonListContext(genUrl);
  
  return (
    <View style={styles.container}>
    <FlatList data={pokemons} renderItem={({item}) => <></>} />
    </View>
  );
}

const styles = StyleSheet.create({
    center: tw`items-center`,
    container: tw`h-full bg-gray-100`,
    placeContainer: tw`w-full`,
    hairline: {height: StyleSheet.hairlineWidth, backgroundColor: "gray"},
    touchable: (isSelected) => tw`flex-row p-3 ${isSelected ? "bg-purple-100" : ""}`,
    name: tw`font-semibold text-lg`,
    description: tw`text-gray-500`,
    mr: tw`mr-4`,
    icon: tw`p-3 bg-purple-200 rounded-full`,
    background: tw`h-full bg-blue-700`,
    buttonView: tw`w-full mt-4`,
    button: tw`p-3 bg-red-700 rounded-full w-50`,
    buttonText: tw`text-white text-center text-lg`,
    center: tw`items-center justify-center`,
});