import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Button} from '@react-navigation/elements'
import { Link } from '@react-navigation/native';

const HomeScreens = () => {
  return (
    <View>
      <Text>HomeScreens</Text>
      <Link screen={"Details"}>Go to Details</Link>
    </View>
  )
}

export default HomeScreens

const styles = StyleSheet.create({})