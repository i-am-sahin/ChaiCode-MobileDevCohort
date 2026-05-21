import * as React from 'react';
import { Text, View } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DetailScreen from '../../screens/DetailScreen';
import HomeScreens from '../../screens/HomeScreens';
import {Ionicons} from '@expo/vector-icons';


function HomeScreen() {
    const navigation = useNavigation();
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button onPress={() =>{
            navigation.navigate('Profile');
        }}>Go to Profile</Button>
      </View>
    );
}


function ProfileScreen() {
    const navigation = useNavigation();
    return(
        <View style={{flex : 1, alignItems : 'center', justifyContent : 'center'}}>
            <Text>Profile Screen</Text>
             <Button onPress={() =>{
            navigation.navigate('Home');
        }}>Go to Home</Button>
        </View>
    );

}
const Tab = createBottomTabNavigator();
function MyTabs(){
    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={
            ({route}) =>({
                tabBarStyle:{
                    height : 70,
                    paddingBottom : 10,
                    paddingTop : 10,
                },
                // tabBarActiveTintColor : 'indigo',
                tabBarInactiveTintColor : 'gray', 
                tabBarIcon: ({focused,color,size}) =>{
                    const icon = route.name === "Home"
                        ? focused ? "home" : "home-outline"
                        : route.name === "Profile"
                        ? focused ? "chatbubble" : "chatbubble-outline"
                        : "help";
                    return <Ionicons name={icon} size={size} color={color} />
                }
            })
        }>
            <Tab.Screen name="Home" component={HomeScreen} 
            options={{
                title:"Dashboard",
                tabBarLabel: "Start"
            }}/>
            {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarBadge:13
            }}/>
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