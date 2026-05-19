import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';

const DetailScreen = () => {
    const navigation = useNavigation();
    // Default values
    const route = useRoute();
  const { userName = "default" } = route.params || {};
  return (
    <View>
      <Text>DetailScreen</Text>
      <Button title="Go to Profile Page" onPress={() => navigation.navigate("Profile",{})}/>
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({})