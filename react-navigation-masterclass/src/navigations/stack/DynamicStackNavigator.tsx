import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreens from '../../screens/HomeScreens';
import DetailScreen from '../../screens/DetailScreen';
import ProfileScreen from '../../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

function MyStack() {
    return(
        <Stack.Navigator screenOptions={{
            headerStyle : {
                backgroundColor : '#61b967',

            },
            headerTintColor : '#fff',
            headerTitleStyle :{
                fontWeight : 300,
                fontSize : 12,
            }
        }}>
            <Stack.Screen name='Home' component={HomeScreens} options={{ // using Options to customize header for Home Screen, other screens will use default header through Stack.Navigator. We can also use options for each screen to customize header for each screen.and we can also use options for customise everything about header for each screen.
                headerShown : true,
                title : 'My Home Page',
                headerStyle :{
                    backgroundColor : '#44ccca'
                },
                headerTintColor : 'white',
                headerTitleAlign : 'center',
                headerTitleStyle :{
                    fontSize : 24,
                    fontWeight : 'bold',
                }
            }}/>
            <Stack.Screen name='Details' component={DetailScreen}/>
            <Stack.Screen name='Profile' component={ProfileScreen}/>
        </Stack.Navigator>
    )
}

export default function DynamicStackNavigator(){
    return(
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}