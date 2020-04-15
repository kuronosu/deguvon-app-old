import { FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Button, Text } from 'react-native-paper'
import React, { useState, useEffect } from 'react'

import Episode from '../components/episode'
import EpisodeSeparator from '../components/episode-separator'
import GeneralLayout from '../../../Utils/components/general-layout'
import VideoPlayerActions from '../../../Stores/VideoPlayer/Actions'

const keyExtractor = (item, index) => `episode_${item.number}_${index}`

const reverse = (data, setData) => {
  let tmp = data.slice()
  tmp.reverse()
  setData(tmp)
}

const getOrderText = (data) => {
  if (data.length > 0 && data[0].number < data[data.length - 1].number) return 'Menor a mayor'
  return 'Mayor a menor'
}

const EpisodeList = ({ found, list, animeName, animeID, playEpisode }) => {
  const [episodes, setEpisodes] = useState(list)
  useEffect(() => {
    setEpisodes(list)
  }, [found, list])

  const renderEpisode = ({ item }) =>
    <Episode
      episode={item}
      handlePlay={() => playEpisode({ number: item.number, anime: { aid: animeID, name: animeName } })}
    />

  if (found) {
    return <GeneralLayout>
      <Button
        color='#424242'
        onPress={() => reverse(episodes, setEpisodes)}
      > {getOrderText(episodes)} </Button>
      <FlatList
        data={episodes}
        keyExtractor={keyExtractor}
        renderItem={renderEpisode}
        ItemSeparatorComponent={EpisodeSeparator}
        ListEmptyComponent={<Text>Nada</Text>}
      />
    </GeneralLayout>
  }
  return <GeneralLayout style={{ justifyContent: 'center', alignItems: 'center' }}>
    <Text>Cargando</Text>
  </GeneralLayout>
}

const mapStateToProps = state => ({
  found: state.anime.data != undefined,
  list: state.anime.data ? state.anime.data.episodes : [],
  animeName: state.anime.data?.name,
  animeID: state.anime?.aid
})

const mapDispatchToprops = dispatch => ({
  playEpisode: ({ number, anime }) => dispatch(VideoPlayerActions.play(anime, number))
})

export default EpisodeListScreen = connect(mapStateToProps, mapDispatchToprops)(EpisodeList)