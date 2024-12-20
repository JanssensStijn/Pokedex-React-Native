import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView} from "react-native";
import tw from "twrnc";
import { Chip, Icon } from "react-native-elements";
import { Audio } from 'expo-av'; //new version expo-audio not compatible yet with react-native
import GeneralDetail from "./Details/GeneralDetail";
import AbilitiesList from "./Details/AbilitiesList";
import Separator from "./Details/Separator";
import TypesList from "./Details/TypesList";
import Stats from "./Details/Stats";


const playSound = async (soundUri) => {
    const soundObject = new Audio.Sound();
    try {
        await soundObject.loadAsync({ uri: soundUri });
        await soundObject.playAsync();
        // Unload the sound after it finishes playing
        soundObject.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
                soundObject.unloadAsync();
            }
        });
    } catch (error) {
        console.log(error);
    }
};


export default function PokemonDetail({ pokemon }) {
    const details = [
        { description: 'Name', value: pokemon.name },
        { description: 'Pokedex id', value: pokemon.id },
        { description: 'Base xp', value: pokemon.base_experience },
        { description: 'Height', value: pokemon.height },
        { description: 'Weight', value: pokemon.weight },
    ];

    return (
        <ScrollView style={styles.pokemonContainer} contentContainerStyle={styles.center}>
            <View style={styles.row}>
                <View style={styles.imageNameContainer}>
                    {pokemon.found && <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} resizeMode="contain" />}
                    {!pokemon.found && <Image source={require("../assets/pokemon_not_found.png")} style={styles.image} resizeMode="contain" />}
                    </View>
                <View style={styles.column}>
                    <TouchableOpacity onPressOut={() => playSound(pokemon.cries.latest)} style={styles.touchable}>
                        <Icon name={"play-circle-outline"} size={40} type="ionicon" style={styles.icon} />
                        <Text style={styles.touchableText}>Latest Cry</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPressOut={() => playSound(pokemon.cries.legacy)} style={styles.touchable}>
                        <Icon name={"play-circle-outline"} size={40} type="ionicon" style={styles.icon} />
                        <Text style={styles.touchableText}>Legacy Cry</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.column, styles.detailsContainer]}>
                {details.map((item) => (
                    <>
                        <GeneralDetail description={item.description} value={item.value} />
                        <Separator />
                    </>
                ))}
                <Separator/>
                <TypesList types={pokemon.types}/>
                <Separator/>
                <AbilitiesList abilities={pokemon.abilities}/>
                <Separator/>
                <Stats stats={pokemon.stats}/>
                
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    center: tw`items-center`,
    pokemonContainer: {
        paddingVertical: 20,
        backgroundColor: '#dbeafe',
        height: '100%'
    },
    row: {
        flexDirection: 'row',
        alignContent: 'center',
    },
    imageNameContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        borderRightColor: 'black',
        borderRightWidth: 1,
    },
    detailsContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        width: '100%',
    },
    column: {
        flexDirection: 'column',
    },
    border:{
        borderRightColor: 'black',
        borderRightWidth: 1,
        borderLeftColor: 'black',
        borderLeftWidth: 1,
    },
    image: {
        width: 150,
        height: 150,
    },
    name: {
        fontSize: 18,
        color: 'black',
    },
    idText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#b91c1c',
    },
    touchable: {
        padding: 10,
        alignItems: 'center',
    },
    touchableText: {
        fontSize: 12,
        color: 'black',
    },
    detailsTitle: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    icon: {
        color: 'black',
    },
    detailsMargin: tw`pl-5 pb-5`,
});