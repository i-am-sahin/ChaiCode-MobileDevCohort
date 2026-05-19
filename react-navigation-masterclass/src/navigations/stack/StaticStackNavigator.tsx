import * as React from 'react';
import { View, Text } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreens from '../../screens/HomeScreens';
import DetailScreen from '../../screens/DetailScreen';
import ProfileScreen from '../../screens/ProfileScreen';



const Stack = createNativeStackNavigator({
  screens:{
    Home: HomeScreens,
    Details: DetailScreen,
    Profile : ProfileScreen


  }
});

const Navigation = createStaticNavigation(Stack);

export default function App(){
  return <Navigation />
}