import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { NAV_POKEMON_LIST } from "../navigation_constants";
import { usePokemonGenContext } from "../contexts/PokemonGenProvider";
import { ActivityIndicator } from "react-native";

function HomeScreenButton({genUrl, text}){
    const navigation = useNavigation();

    return(
        <View style={[styles.buttonView, styles.center]}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(NAV_POKEMON_LIST, {genUrl})}>
                <Text style={styles.buttonText}>
                    {text.toUpperCase()}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default function HomeScreen() {
    const pokemonGenerations = usePokemonGenContext();
return (
    <View style={[styles.background, styles.center]}>
        {!pokemonGenerations.loading && pokemonGenerations.pokemonGens.map(gen => (
            <HomeScreenButton key={gen.name} genUrl={gen.url} text={gen.name} />
        ))}
        
        {pokemonGenerations.loading && <>
        <ActivityIndicator size="large" color="red" />
        <Text style={styles.buttonText}>Loading...</Text>
        </>
        }
    </View>
);
}

const styles = StyleSheet.create(
    {
        background: tw`h-full bg-blue-700`,
        buttonView: tw`w-full mt-4`,
        button: tw`p-3 bg-red-700 rounded-full w-50`,
        buttonText: tw`text-white text-center text-lg`,
        center: tw`items-center justify-center`,
    }
)