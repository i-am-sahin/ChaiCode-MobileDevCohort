import * as React from 'react';
import { View, Text } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreens from './src/screens/HomeScreens';
import DetailScreen from './src/screens/DetailScreen';


const Stack = createNativeStackNavigator({
  screens:{
    Home :HomeScreens,
    Details:DetailScreen,

  }
});

const Navigation = createStaticNavigation(Stack);

export default function App(){
  return <Navigation />
}