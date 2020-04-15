import React from 'react'
import { StyleSheet } from 'react-native'
import RNVideo from 'react-native-video'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import PropTypes from 'prop-types'

import Overlay from './overlay'
// import { Overwrite } from '../../../utils'
import { height, width } from '../../../Utils/screen-landscape'

const Video = props => 
  <TouchableWithoutFeedback onPress={props.toggleControls}>
    <RNVideo
      {...props}
      volume={1}
      controls={false}
      fullscreen={true}
      style={styles.video}
      resizeMode='contain'
      ref={props.playerRef}
      source={{ uri: props.src }}
    />
    {
      props.showContols &&
      <Overlay opaque />
    }
  </TouchableWithoutFeedback>

Video.prototype = {
  showContols: PropTypes.bool,
  toggleControls: PropTypes.func,
  onBuffer: PropTypes.func
}

export default Video

const styles = StyleSheet.create({
  video: {
    height,
    width,
    alignSelf: "stretch",
  }
})
