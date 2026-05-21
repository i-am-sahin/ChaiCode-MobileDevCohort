import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/home/HomeScreen";
import RestaurantDetailScreen from "../screens/home/RestaurantDetailScreen";
import CartScreen from "../screens/home/CartScreen";

import { Colors } from "../theme/tokens";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },

        headerTintColor: "#fff",

        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />

      <Stack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
        options={{
          title: "Restaurant Details",
          headerBackTitle: "Back",
        }}
      />

      <Stack.Screen
        name="Cart"
        component={CartScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;