import { StyleSheet, Text, View} from "react-native";
import tw from "twrnc";
import { capitalizeFirstChar } from "../../utils/utils";

export default function GeneralDetail({description, value}) {
  return (
      <View style={styles.row}>
        <Text style={styles.detailsTitle}>{capitalizeFirstChar(description)}: </Text>
        <Text style={styles.detailsValue}>{capitalizeFirstChar(value)}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
    container: tw`flex-1 justify-center items-center bg-blue-100`,
    detailsTitle: tw`text-black text-center text-lg font-bold`,
    detailsValue: tw`ml-5 text-black text-center text-lg`,
    row: tw`flex-row justify-start`,
    column: tw`flex-col justify-start`,
});