import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "@expo/vector-icons/Ionicons";

import HomeStackNavigator from "./HomeStackNavigator";

import SearchScreen from "../screens/tabs/SearchScreen";
import OrdersScreen from "../screens/tabs/OrdersScreen";
import ProfileScreen from "../screens/tabs/ProfileScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ProfileDrawerNavigator from "./ProfileDrawerNavigator";

import { Colors } from "../theme/tokens";


const Tab = createBottomTabNavigator();

const getTabBarVisibility = (route: any) => {
  const routeName =
    getFocusedRouteNameFromRoute(route) ?? "Home";

  if (
    routeName === "RestaurantDetail" ||
    routeName === "Cart"
  ) {
    return "none";
  }

  return "flex";
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          backgroundColor: Colors.card,
          height: 64,
          paddingTop: 6,
          paddingBottom: 10,
          display: route.name === "HomeTab" ? getTabBarVisibility(route) : "flex",
        },

        tabBarLabelStyle: {
          fontWeight: "700",
          fontSize: 12,
        },

        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === "HomeTab") {
            iconName = "home";
          } else if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Orders") {
            iconName = "receipt";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
  name="HomeTab"
  component={HomeStackNavigator}
  options={{
    title: "Home",
  }}
/>

      <Tab.Screen
        name="Search"
        component={SearchScreen}
      />

      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarBadge: 2,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileDrawerNavigator}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
