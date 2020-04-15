import React from 'react'
import { View, StyleSheet } from 'react-native'
import { width, height } from '../../../Utils/screen-landscape'

const PlayerLayout = ({ children }) => (
  <View style={styles.container}>
    {children}
  </View>
)

export default PlayerLayout

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height,
    width
  }
})