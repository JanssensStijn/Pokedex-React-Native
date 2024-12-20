import { FlatList, StyleSheet, Text, View} from "react-native";
import tw from "twrnc";
import { capitalizeFirstChar } from "../../utils/utils";

export default function AbilitiesList({abilities}) {
  return (
    <>
      <Text style={styles.detailsTitle}>Abilities:</Text>
      <View style={styles.container}>
        {abilities.map((ability) => (
          <View style={[styles.itemContainer, styles.flat_list]} key={capitalizeFirstChar(ability.ability.name)}>
            <Text style={styles.detailsValue}>{capitalizeFirstChar(ability.ability.name)}</Text>
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
        padding: 10,
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
    detailsValue: tw`text-white text-center text-lg`,
  });