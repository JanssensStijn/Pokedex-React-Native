import { Platform, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import tw from "twrnc";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAV_HOME} from './navigation_constants';
import HomeScreen from './screens/HomeScreen';
import { PokemonGenProvider } from './contexts/PokemonGenProvider';

const Stack = createNativeStackNavigator();

const screenOptions = ({
  headerStyle: tw`bg-red-700`,
  headerTitleStyle: tw`text-white text-xl font-bold`,

});

function ProvideApp() {
  return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name={NAV_HOME} component={HomeScreen} />
      </Stack.Navigator>
  );
}

export default function App() {
  return (
    Platform.select({
      web: (
        <NavigationContainer>
          <PokemonGenProvider>
            <ProvideApp />
          </PokemonGenProvider>
        </NavigationContainer>
      ),
      default: (
        <NavigationContainer>
          <StatusBar/>
          <PokemonGenProvider>
            <ProvideApp />
          </PokemonGenProvider>
        </NavigationContainer>
      ),
    })
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tw`bg-gray-300`,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
