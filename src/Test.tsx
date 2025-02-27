import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Test() {
  return (
    <View style={styles.container}>
      <Text>Test</Text>
    </View>
  )
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'grey',
        justifyContent:'center',
        alignItems:'center'
    }
})