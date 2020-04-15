import React, { useRef, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
// import { OnLoadData, OnProgressData, LoadError } from 'react-native-video'

import Video from './components/video'
import Controls from './components/control-layout'
import PlayerLoader from './components/player-loader'
import PlayerLayout from './components/player-layout'
import timeFormatter from '../../Utils/time-formater'
import DropDownHolder from '../../Utils/dropdownholder'

const VideoPlayer = ({ title, video }) => {
  const playerRef = useRef()
  const timeFormat = useRef(true)
  const [paused, setPaused] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showContols, setShowContols] = useState(false)
  const [currentTimeFormated, setCurrentTimeFormated] = useState('00:00')
  const [durationFormated, setDurationFormated] = useState('  00:00')
  const [timeLeftFormated, setTimeLeftFormated] = useState('  00:00')
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  useEffect(() => {
    Orientation.lockToLandscape()
    return () => Orientation.unlockToUser()
  }, [])

  // Event handles
  const toggleControls = () => setShowContols(!showContols)
  const onVideoLoaded = ({ duration }) => {
    if (duration >= 3600) {
      timeFormat.current = false
    }
    setLoading(false)
    setDurationFormated(timeFormatter(duration, timeFormat.current, false))
    setDuration(duration)
  }
  const onVideoBuffer = ({ isBuffering }) => setLoading(isBuffering)

  const onVideoError = e => {
    // this.props.navigation.goBack()
    DropDownHolder.alert('error', 'Error', 'Error al reproducir el video')
  }

  const onVideoProgress = ({ currentTime, playableDuration, seekableDuration }) => {
    setCurrentTimeFormated(timeFormatter(currentTime, timeFormat.current))
    setCurrentTime(currentTime)
    setTimeLeftFormated(timeFormatter(seekableDuration - currentTime, timeFormat.current, true))
    // setTimeLeftFormated(timeFormatter(duration - currentTime, timeFormat.current, true))
  }
  const relativeSeek = offset => {
    const newTime = currentTime + offset
    setCurrentTime(newTime)
    setCurrentTimeFormated(timeFormatter(newTime, timeFormat.current))
    playerRef?.current?.seek(newTime)
  }
  const togglePlay = () => setPaused(!paused)

  return <PlayerLayout>
    <StatusBar hidden={true} />
    <Video
      // source={{}}
      toggleControls={toggleControls}
      playerRef={playerRef}
      showContols={showContols}
      paused={paused}
      src={video}
      onLoad={onVideoLoaded}
      onBuffer={onVideoBuffer}
      onError={onVideoError}
      onProgress={onVideoProgress}
    />
    {
      loading &&
      <PlayerLoader />
    }
    {
      showContols &&
      <Controls
        title={title}
        currentTime={currentTimeFormated}
        duration={durationFormated}
        timeLeft={timeLeftFormated}
        paused={paused}
        relativeSeek={relativeSeek}
        togglePlay={togglePlay}
      />
    }
  </PlayerLayout>
}

// props 
// video
// title
const mapStateToProps = state => ({
  video: state.vPlayer.video,
  title: state.vPlayer.title
})

export default VideoPlayerScreen = connect(mapStateToProps)(VideoPlayer)