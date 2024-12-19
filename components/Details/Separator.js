import { StyleSheet,View} from "react-native";

export default function Separator() {
  return <View style={styles.hairline}/>;
}

const styles = StyleSheet.create({
    hairline: {height: StyleSheet.hairlineWidth, backgroundColor: "gray"},
});