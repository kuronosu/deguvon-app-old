import React from 'react'
import IconFoundation from 'react-native-vector-icons/Foundation'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import PropTypes from 'prop-types'

import IconContainer from './icon-container'

const PlayPause = ({paused, color, onPress}) => {
  const Icon = paused ? IconMaterial : IconFoundation
  return (
    <IconContainer>
      <Icon
        onPress={onPress}
        name={paused ? 'play-arrow' : 'pause'}
        color={color ? color : 'white'}
        size={30}
      />
    </IconContainer>
  )
}

PlayPause.prototype = {
  paused: PropTypes.bool.isRequired,
  color: PropTypes.string,
  onPress: PropTypes.func.isRequired
}

export default PlayPause