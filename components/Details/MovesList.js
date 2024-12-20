import { StyleSheet, Text, View} from "react-native";
import tw from "twrnc";
import { capitalizeFirstChar } from "../../utils/utils";

export default function MovesList({moves}) {
  const sortedMoves = [...moves].sort((a, b) => a.move.name.localeCompare(b.move.name));
  return (
    <View>
      <Text style={styles.detailsTitle}>Possible Moves:</Text>
      <View style={styles.container}>
        {sortedMoves.map((move) => (
          <View style={[styles.itemContainer, styles.flat_list]} key={capitalizeFirstChar(move.move.name)}>
            <Text style={styles.detailsValue}>{capitalizeFirstChar(move.move.name)}</Text>
          </View>
        ))}
      </View>
    </View>
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