import * as React from 'react';
import { Text, View } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DetailScreen from '../../screens/DetailScreen';
import HomeScreens from '../../screens/HomeScreens';
import SearchScreen from '../../screens/SearchScreen';
import {Ionicons} from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../../screens/ProfileScreen';

const HomeStack = createStackNavigator();
function HomeStackScreens(){
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreens}/>
            <HomeStack.Screen name="Detail" component={DetailScreen}/>
        </HomeStack.Navigator>
    )

}

const Tab = createBottomTabNavigator();
function MyTabs(){
    return (
        <Tab.Navigator >
            <Tab.Screen name='OverView' component={HomeStackScreens} options={{headerShown:false}}/>
            <Tab.Screen name='Search' component={SearchScreen} />
            <Tab.Screen name = 'Profile' component={ProfileScreen} />
           
        </Tab.Navigator>
    )
}

export default function DynamicTabNavigator(){
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    )
}