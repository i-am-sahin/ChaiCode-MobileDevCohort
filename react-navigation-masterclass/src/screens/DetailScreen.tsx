import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const DetailScreen = () => {
    const navigation = useNavigation();
  return (
    <View>
      <Text>DetailScreen</Text>
      <Button title="Go to Profile Page" onPress={() => navigation.navigate("Profile",{userName : "ChaiCode"})}/>
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({})