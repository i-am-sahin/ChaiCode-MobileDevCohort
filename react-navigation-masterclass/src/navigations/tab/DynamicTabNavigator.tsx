import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../../screens/ProfileScreen';
import DetailScreen from '../../screens/DetailScreen';
import HomeScreens from '../../screens/HomeScreens';

const Tab = createBottomTabNavigator();
function MyTabs(){
    return (
        <Tab.Navigator initialRouteName='Details' screenOptions={{headerShown:true}}>
            <Tab.Screen name="Home" component={HomeScreens} 
            options={{
                title:"Dashboard",
                tabBarLabel: "Start"
            }}/>
            {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
            <Tab.Screen name="Details" component={DetailScreen} />
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