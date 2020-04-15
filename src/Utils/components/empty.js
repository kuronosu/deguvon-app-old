import React from 'react'
import { View, Text, StyleSheet } from "react-native"

// type Props = {
//   text: string
//   color?: string
// }

const Empty = ({text, color}) => (
  <View style={styles.container} >
    <Text style={[styles.text, color ? { color } : {}]} >{text}</Text>
  </View>
)

export default Empty

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 100
  },
  text: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center'
  }
})
