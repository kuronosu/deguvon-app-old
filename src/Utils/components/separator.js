import React from 'react'
import { View } from 'react-native'

// type Props = {
//   numCards: number
// }

const VerticalSeparator = ({ width, numCards }) => (
  <View style={{
    padding: (width * (1 / ((numCards + 1) * 10) / 2)) + 1
  }}
  />
)

export default VerticalSeparator