import { Platform, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import tw from "twrnc";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAV_HOME, NAV_POKEMON_DETAILS, NAV_POKEMON_LIST} from './navigation_constants';
import HomeScreen from './screens/HomeScreen';
import { PokemonGenProvider } from './contexts/PokemonGenProvider';
import PokemonListScreen from './screens/PokemonListScreen';
import PokemonDetailsScreen from './screens/PokemonDetailsScreen';

const Stack = createNativeStackNavigator();

const screenOptions = ({
  headerStyle: tw`bg-red-700`,
  headerTitleStyle: tw`text-white text-xl font-bold`,
  headerTitleAlign: 'center',
  headerTintColor: 'white',
});

function ProvideApp() {
  return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name={NAV_HOME} component={HomeScreen} />
        <Stack.Screen name={NAV_POKEMON_LIST} component={PokemonListScreen} />
        <Stack.Screen name={NAV_POKEMON_DETAILS} component={PokemonDetailsScreen} />
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
