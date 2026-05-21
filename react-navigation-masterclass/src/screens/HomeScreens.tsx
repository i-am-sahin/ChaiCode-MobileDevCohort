import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Button} from '@react-navigation/elements'
import { Link, useNavigation } from '@react-navigation/native';

const HomeScreens = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>HomeScreens</Text>
      <Button onPress={() =>navigation.navigate("Detail")}>Go to Details</Button>
    </View>
  )
}

export default HomeScreens

const styles = StyleSheet.create({})