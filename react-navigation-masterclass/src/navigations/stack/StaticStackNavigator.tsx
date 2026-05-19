import * as React from 'react';
import { View, Text } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreens from '../../screens/HomeScreens';
import DetailScreen from '../../screens/DetailScreen';
import ProfileScreen from '../../screens/ProfileScreen';



const Stack = createNativeStackNavigator({
  screens:{ 
    Home: {
      screen: HomeScreens,
      options : { //Using options we can customize header for static stack navigator, we can also use options for each screen to customize header for each screen and we can also use options for customise everything about header for each screen.
        title : 'My Home Page',
        headerStyle :{
            backgroundColor : '#44ccca'
        },
        headerTintColor : 'white',
        headerTitleAlign : 'center',
        headerTitleStyle :{
            fontSize : 24,
            fontWeight : 'bold',
        },
      }
    },
    Details: DetailScreen,
    Profile : ProfileScreen


  }
});

const Navigation = createStaticNavigation(Stack);

export default function StaticStackNavigator(){
  return <Navigation />
}