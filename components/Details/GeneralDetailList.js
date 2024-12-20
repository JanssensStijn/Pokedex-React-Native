import { StyleSheet, Text, View} from "react-native";
import tw from "twrnc";
import GeneralDetail from "./GeneralDetail";
import Separator from "./Separator";

export default function GeneralDetailList({pokemon}) {
    const details = [
            { description: 'Name', value: pokemon.name },
            { description: 'Pokedex id', value: pokemon.id },
            { description: 'Base xp', value: pokemon.base_experience },
            { description: 'Height', value: pokemon.height/10.0 + ' m' },
            { description: 'Weight', value: pokemon.weight/10.0 + ' kg' },
        ];
  return (
    <View style={[styles.column]}>
      <Text style={styles.detailsTitle}>General:</Text>
        {details.map((item) => (
            <View key={item.description}>
                <GeneralDetail description={item.description} value={item.value}/>
                <Separator/>
            </View>
        ))}
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
    column: {
        flexDirection: 'column',
    },
    detailsTitle: tw`text-black text-center text-lg font-bold`,
    detailsValue: tw`text-white text-center text-lg`,
  });