import React from 'react'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import PropTypes from 'prop-types'
import IconContainer from './icon-container'

// type Props = {
//   name: string
//   disable?: boolean
//   color?: string
//   set?: 'MaterialIcons'
//   onPress?: () => void
// }

const IconController = ({ onPress, name, disable, color, set }) => {
  let Icon = IconAntDesign
  if (set == 'MaterialIcons') {
    Icon = MaterialIcons
  }
  return (
    <IconContainer>
      <Icon
        onPress={onPress}
        name={name}
        color={disable ? 'rgba(255, 255, 255, 0.3)' : (color ? color : 'white')}
        size={25}
      />
    </IconContainer>
  )
}

IconController.prototype = {
  name: PropTypes.string.isRequired,
  disable: PropTypes.bool,
  color: PropTypes.string,
  set: PropTypes.oneOf('MaterialIcons', PropTypes.any),
  onPress: PropTypes.func.isRequired
}

export default IconController