// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import {View, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import CardsScreen from './screens/CardsScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import MyListScreen from './screens/MyListScreen';
import ProfileScreen from './screens/ProfileScreen';
import CardSetScreen from './screens/CardSetScreen';
import FlashCards from './screens/FlashCards';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import AddFlashCard from './screens/AddFlashCard';
import UpdateFlashCard from './screens/UpdateFlashCard';
import DeleteFlashCard from './screens/DeleteFlashCard';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Cards" component={CardsScreen} />
          <Stack.Screen name="Discover" component={DiscoverScreen} />
          <Stack.Screen name="MyList" component={MyListScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="CardSet" component={CardSetScreen} />
          <Stack.Screen name="FlashCards" component={FlashCards} />
          <Stack.Screen
            name="Add Flash Card"
            options={{presentation: 'fullScreenModal'}}
            component={AddFlashCard}
          />
          <Stack.Screen
            name="UpdateFlashCard"
            options={{presentation: 'fullScreenModal', headerShown: false}}
            component={UpdateFlashCard}
          />
          <Stack.Screen
            name="DeleteFlashCard"
            component={DeleteFlashCard}
            options={{presentation: 'modal', headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
