import React from 'react'
import { View, StyleSheet } from 'react-native'
// import { TabBarIconProps } from '../..'
import Icon from '../../Utils/components/icon'

// type HomeNavigatorIconProps = {
//   iconSet: IconSet
//   name: string
// } & TabBarIconProps

const HomeNavigatorIcon/*: React.FC<HomeNavigatorIconProps> */= ({ color, focused, iconSet, name }) => (
  <View style={styles.container}>
    <Icon set={iconSet} name={name} size={focused ? 28 : 25} color={color? color: 'white'} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default HomeNavigatorIcon