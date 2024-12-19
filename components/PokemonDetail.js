import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import tw from "twrnc";
import { Chip, Icon } from "react-native-elements";
import { Audio } from 'expo-av'; //new version expo-audio not compatible yet with react-native
import GeneralDetail from "./Details/GeneralDetail";
import AbilitiesList from "./Details/AbilitiesList";
import Separator from "./Details/Separator";


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

const getTypeColor = (type) => {
    switch (type) {
        case 'fire': return '#F08030';
        case 'water': return '#6890F0';
        case 'grass': return '#78C850';
        case 'electric': return '#F8D030';
        case 'ice': return '#98D8D8';
        case 'fighting': return '#C03028';
        case 'poison': return '#A040A0';
        case 'ground': return '#E0C068';
        case 'flying': return '#A890F0';
        case 'psychic': return '#F85888';
        case 'bug': return '#A8B820';
        case 'rock': return '#B8A038';
        case 'ghost': return '#705898';
        case 'dragon': return '#7038F8';
        case 'dark': return '#705848';
        case 'steel': return '#B8B8D0';
        case 'fairy': return '#EE99AC';
        default: return '#A8A878';
}};

const getContrastColor = (bgColor) => {
        const color = bgColor.substring(1); // Remove the '#' character
        const rgb = parseInt(color, 16); // Convert hex to integer
        const r = (rgb >> 16) & 0xff; // Extract red
        const g = (rgb >>  8) & 0xff; // Extract green
        const b = (rgb >>  0) & 0xff; // Extract blue
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b; // Calculate luminance
        return luminance > 160 ? '#000000' : '#FFFFFF'; // Choose black or white based on luminance
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
        <View style={[styles.center, styles.pokemonContainer]}>
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
                <FlatList
                    data={details}
                    keyExtractor={(item) => item.description}
                    renderItem={({ item }) => (
                        <GeneralDetail description={item.description} value={item.value} />
                    )}
                    ItemSeparatorComponent={Separator}
                />
                <View style={[styles.row]}>
                    <Text style={styles.detailsTitle}>Types: </Text>
                </View>
                <View style={[styles.row]}>
                    {pokemon.types.map((type, index) => {
                        const bgColor = getTypeColor(type.type.name);
                        const textColor = getContrastColor(bgColor);
                        return (
                            <Chip key={index} title={type.type.name} buttonStyle={{ backgroundColor: bgColor, margin:2 }} titleStyle={{ color: textColor }}/>
                        );
                    })}
                </View>
                <AbilitiesList abilities={pokemon.abilities}/>
                <View style={[styles.row]}>
                    <Text style={styles.detailsTitle}>Abilities: </Text>
                </View>
                <View style={[styles.column]}>
                    {pokemon.abilities.map((ability, index) => (
                        <Text style={[styles.row]} key={index}>- {ability.ability.name}</Text>
                    ))}
                </View>
            </View>
        </View>
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