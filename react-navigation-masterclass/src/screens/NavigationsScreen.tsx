import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NavigationsScreen = () => {
  return (
    <View>
      <Text style={styles.textHeading}>Profile Page</Text>
      <View>
        <View>
            <Image source={{uri: 'https://i.pinimg.com/originals/4c/f0/6a/4cf06a33233964ee2276865a5206b0ca.jpg'}} style={{width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginBottom: 20}} />
        </View>
        <Text style={styles.textStyle}>Name: Sahin Islam</Text>
        <Text style={styles.textStyle}>Email: sahin.islam@example.com</Text>
        <Text style={styles.textStyle}>Phone: +1234567890</Text>
      </View>
    </View>
  )
}

export default NavigationsScreen

const styles = StyleSheet.create({
    textHeading :{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center',
    },
    textStyle :{
        fontSize: 16,
        paddingLeft: 10,
    }
})