import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = ({route} : any) => {
    const navigation = useNavigation();
    const {userName} = route.params;
  return (
    <View>
      <Text>ProfileScreen of {userName}</Text>
      <Button title="Go to Home" onPress={() => navigation.popTo("Home")}/>
        {/* <Button title="Go to Profile with Push" onPress={() => navigation.push("Profile")}/> */}
        {/* <Button title="Go to Home" onPress={() => navigation.replace("Home")}/> */}

    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})