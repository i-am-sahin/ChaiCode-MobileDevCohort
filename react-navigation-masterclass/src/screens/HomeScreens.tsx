import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Button} from '@react-navigation/elements'

const HomeScreens = () => {
  return (
    <View>
      <Text>HomeScreens</Text>
      <Button screen={"Details"}>Go to Details</Button>
    </View>
  )
}

export default HomeScreens

const styles = StyleSheet.create({})