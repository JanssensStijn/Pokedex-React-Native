import { FlatList, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import tw from "twrnc";
import { capitalizeFirstChar } from "../../utils/utils";
import { RadarChart } from "@salmonco/react-native-radar-chart";

export default function Stats({stats}) {
    const windowDim = useWindowDimensions();

    const statsData = stats.map((stat) => {
        return {
            label: capitalizeFirstChar(stat.stat.name),
            value: stat.base_stat,
        };
    }, [stats]);

    return (
    <View style={styles.container}>
        <Text style={styles.detailsTitle}>Stats:</Text>
        <RadarChart
            data={statsData}
            size={windowDim.width * 0.8}
            scale={0.95}
            maxValue={150}
            gradientColor={{
            startColor: 'grey',
            endColor: 'lightgrey',
            count: 5,
            }}
            stroke={['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#000000']}
            strokeWidth={1}
            labelSize={14}
            labelDistance={1.2}
            dataFillColor="transparent"
            dataStroke="#b91c1c"
            dataStrokeWidth={2}
            isCircle
        />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsTitle: tw`text-black text-center text-lg font-bold`,
  });