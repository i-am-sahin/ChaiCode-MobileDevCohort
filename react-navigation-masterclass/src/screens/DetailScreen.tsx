import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';

const DetailScreen = () => {
    const navigation = useNavigation();
    // Default values
    const route = useRoute();
  const { userName = "default" } = route.params || {};
  useLayoutEffect(() =>{ //Using useLayoutEffect to set header options dynamically for Detail Screen, we can also use useEffect but it will cause a flickering effect on header because of the delay in setting header options, but useLayoutEffect will set header options before rendering the screen, so it will not cause any flickering effect on header.
    navigation.setOptions({
        title : "Sahin's Detail Page"
    })
  },[navigation])
  return (
    <View>
      <Text>DetailScreen</Text>
      <Button title="Go to Profile Page" onPress={() => navigation.navigate("Profile",{})}/>
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({})