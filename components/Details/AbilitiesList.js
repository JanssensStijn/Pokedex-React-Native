import { FlatList, StyleSheet, Text, View} from "react-native";
import tw from "twrnc";
import { capitalizeFirstChar } from "../../utils/utils";
import { ScrollView } from "react-native-web";

export default function AbilitiesList({abilities}) {
  return (
      <View style={styles.column}>
        <Text style={styles.detailsTitle}>Abilities:</Text>
        <FlatList
            data={abilities}
            numColumns={3}
            keyExtractor={(item) => 'Ability' + item.ability.name}
            renderItem={({ item }) => 
                <View style={styles.itemContainer}>
                    <Text style={styles.detailsValue}>{capitalizeFirstChar(item.ability.name)}</Text>
                </View>
                }
            contentContainerStyle={styles.flat_list}
            columnWrapperStyle={styles.flat_list}
        />
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    itemContainer: {
        flex: 1,
        margin: 5,
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: '#b91c1c',
        borderWidth: 2,
        borderRadius: 50,
        backgroundColor: '#b91c1c',
    },
    
    detailsTitle: tw`text-black text-center text-lg font-bold`,
    detailsValue: tw`text-white text-center text-lg`,

    flatListContent: {
      justifyContent: 'space-between',
    },
    columnWrapper: {
      justifyContent: 'space-between',
    },
  });