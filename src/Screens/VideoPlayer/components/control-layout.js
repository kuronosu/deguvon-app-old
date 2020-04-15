import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'

import Overlay from './overlay'
import PlayPause from './play-pause'
import IconController from './icon-cotroller'
import { height } from '../../../Utils/screen-landscape'
import BackButton from '../../../Navigators/components/back-button'

const Controls = ({ title, currentTime, relativeSeek, paused, togglePlay, duration, timeLeft }) =>
  <Overlay >
    <View style={[styles.bar, styles.header]}>
      <BackButton />
      <Text style={styles.title}>{title}</Text>
    </View>
    <View style={[styles.bar, styles.controls]}>
      <View style={styles.controlTimeContainer}>
        <Text style={styles.controlTime}>{currentTime}</Text>
        <Text />
      </View>
      <View style={[styles.controls, styles.controlButtons]}>
        <IconController name='' disable />
        <IconController name='doubleleft' disable />
        <IconController name='left' onPress={() => { relativeSeek(-5) }} />
        <PlayPause onPress={togglePlay} paused={paused} />
        <IconController name='right' onPress={() => { relativeSeek(15) }} />
        <IconController name='doubleright' disable />
        <IconController name='rotate-right' set='MaterialIcons' onPress={() => { relativeSeek(85) }} />
      </View>
      <View style={styles.controlTimeContainer}>
        <Text style={styles.controlTime}>{duration}</Text>
        <Text style={[styles.controlTime]}>{timeLeft}</Text>
      </View>
    </View>
  </Overlay>

Controls.prototype = {
  title: PropTypes.string.isRequired,
  currentTime: PropTypes.string.isRequired,
  relativeSeek: PropTypes.func.isRequired,
  togglePlay: PropTypes.func.isRequired,
  paused: PropTypes.bool.isRequired,
  duration: PropTypes.string.isRequired,
  timeLeft: PropTypes.string.isRequired
}
// type Props = {
//   title: string
//   currentTime: string | number
//   relativeSeek: (offset: number) => void
//   togglePlay: () => void
//   paused: boolean
//   duration: string | number
//   timeLeft: string | number
// }


const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flexDirection: 'row',
    alignItems: 'center'
  },
  header: {
    transform: [
      { translateY: -height + 50 }
    ]
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
  controls: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  controlTimeContainer: {
    alignItems: 'flex-start',
    marginHorizontal: 10,
    marginTop: 5
  },
  controlTime: {
    color: 'white',
  },
  controlButtons: {
    flexDirection: 'row',
  },
})

export default Controls