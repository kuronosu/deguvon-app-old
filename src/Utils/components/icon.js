import React from 'react'
// import { Icon as RNVectorIcon, IconProps } from 'react-native-vector-icons/Icon'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import Zocial from 'react-native-vector-icons/Zocial'

// export type IconSet = 'MaterialCommunityIcons' |
//                       'SimpleLineIcons' |
//                       'MaterialIcons' |
//                       'FontAwesome' |
//                       'Foundation' |
//                       'EvilIcons' |
//                       'Octicons' |
//                       'Ionicons' |
//                       'Feather' |
//                       'Entypo' |
//                       'Zocial'

// interface Props extends IconProps {
//   set: IconSet
// }

const iconSet = {
  MaterialCommunityIcons,
  SimpleLineIcons,
  MaterialIcons,
  FontAwesome,
  Foundation,
  EvilIcons,
  Octicons,
  Ionicons,
  Feather,
  Entypo,
  Zocial,
}

function loadSet(set) {
  if (iconSet.hasOwnProperty(set))
    return iconSet[set]
  return MaterialCommunityIcons
}

const Icon = (props) => {
  const IconSet = loadSet(props.set)
  return (
    <IconSet {...props} />
  )
}

export default Icon