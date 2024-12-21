import { Button, Platform, Pressable, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import tw from "twrnc";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAV_HOME, NAV_POKEMON_DETAILS, NAV_POKEMON_FAVORITES, NAV_POKEMON_LIST} from './navigation_constants';
import HomeScreen from './screens/HomeScreen';
import { PokemonGenProvider } from './contexts/PokemonGenProvider';
import PokemonListScreen from './screens/PokemonListScreen';
import PokemonDetailsScreen from './screens/PokemonDetailsScreen';
import { FavoritesProvider } from './contexts/FavoritesProvider';
import { Icon } from 'react-native-elements';
import PokemonFavoritesScreen from './screens/PokemonFavoritesScreen';

const Stack = createNativeStackNavigator();

const screenOptions = ({
  headerStyle: tw`bg-red-700`,
  headerTitleStyle: tw`text-white text-xl font-bold`,
  headerTitleAlign: 'center',
  headerTintColor: 'white'
});



function ProvideApp() {
  
  const navigation = useNavigation();
  const favoriteButton = () => ({
  headerRight: () => (
    <Pressable onPressIn={() => navigation.navigate(NAV_POKEMON_FAVORITES)}>
      <Icon name={"heart-half-outline"} size={24} type="ionicon" style={styles.icon} color={'white'}/>
    </Pressable>
  )});

  return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name={NAV_HOME} component={HomeScreen} options={favoriteButton()}/>
        <Stack.Screen name={NAV_POKEMON_LIST} component={PokemonListScreen} options={favoriteButton()}/>
        <Stack.Screen name={NAV_POKEMON_DETAILS} component={PokemonDetailsScreen} options={favoriteButton()}/>
        <Stack.Screen name={NAV_POKEMON_FAVORITES} component={PokemonFavoritesScreen}/>
      </Stack.Navigator>
  );
}

export default function App() {
  
  return (
    Platform.select({
      web: (
        <FavoritesProvider>
          <NavigationContainer>
            <PokemonGenProvider>
              <ProvideApp />
            </PokemonGenProvider>
          </NavigationContainer>
        </FavoritesProvider>
      ),
      default: (
        <FavoritesProvider>
          <NavigationContainer>
            <StatusBar/>
            <PokemonGenProvider>
              <ProvideApp />
            </PokemonGenProvider>
          </NavigationContainer>
        </FavoritesProvider>
      ),
    })
  );
}

const styles = StyleSheet.create({
  icon: {
    ...(Platform.OS === 'web' && { margin: 10 }),
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ffffff",
  },
});