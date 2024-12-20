import { FlatList, StyleSheet, Text, View} from "react-native";
import tw from "twrnc";
import { capitalizeFirstChar } from "../../utils/utils";
import { ScrollView } from "react-native-web";
import { Chip } from "react-native-elements";

export default function TypesList({types}) {
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

  return (
    <>
      <Text style={styles.detailsTitle}>Types:</Text>
      <View style={styles.container}>
        {types.map((type) => {
          const bgColor = getTypeColor(type.type.name);
          const textColor = getContrastColor(bgColor);
          return (
            <View style={[styles.itemContainer, { backgroundColor: bgColor }]} key={type.type.name}>
              <Text style={[styles.detailsValue, { color: textColor }]}>{capitalizeFirstChar(type.type.name)}</Text>
            </View>
          )
        })}
      </View>
    </>
  );
}
  
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
  },
  itemContainer: {
    width: '48.5%',
    marginBottom: 10,
    padding: 5,
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#b91c1c',
  },
      
  detailsTitle: tw`text-black text-center text-lg font-bold`,
  detailsValue: tw`text-center text-lg`,
});