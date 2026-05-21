import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import ProfileScreen from "../screens/tabs/ProfileScreen";

import MyOrdersScreen from "../screens/drawer/MyOrdersScreen";
import SettingsScreen from "../screens/drawer/SettingsScreen";
import HelpScreen from "../screens/drawer/HelpScreen";
import CustomDrawerContent from "../components/CustomDrawerContent";

const Drawer = createDrawerNavigator();

const ProfileDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent {...props} />
      )}
    >
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
      />

      <Drawer.Screen
        name="My Orders"
        component={MyOrdersScreen}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
      />

      <Drawer.Screen
        name="Help"
        component={HelpScreen}
      />
      <Drawer.Screen
  name="Logout"
  component={ProfileScreen}
/>
    </Drawer.Navigator>
  );
};

export default ProfileDrawerNavigator;