import React, { useEffect } from "react"
// import { DispatchProp } from "react-redux"
import { FlatList, Dimensions } from "react-native"
import { connect } from "react-redux"
// import { NavigationActions } from 'react-navigation'
import { PORTRAIT } from '../../Stores/App/InitialState'
import AnimeActions from '../../Stores/Anime/Actions'

// import { StoreState, RecentEpisode, AnimeModel, RecentStore } from "../../../"
import Card from "../../Utils/components/card"
import Empty from "../../Utils/components/empty"
// import DropDownHolder from "../../../Utils/dropdownholder"
import VerticalSeparator from "../../Utils/components/separator"
import GeneralLayout from "../../Utils/components/general-layout"
import LatestEpisodesActions from '../../Stores/LatestEpisodes/Actions'
import { navigate } from "../../Services/NavigationService"
import VideoPlayerActions from "../../Stores/VideoPlayer/Actions"

const Recent = ({ list, mode, screenWidth, refreshing, directoryData, fetchLatestEpisodes, goAnime, playEpisode }) => {
  useEffect(() => {
    fetchLatestEpisodes()
  }, [])

  const renderItem = ({ item, index }) => <Card
    pressData={item}
    mode={mode}
    screenWidth={screenWidth}
    index={index}
    onPressCard={playEpisode}
    onLongPressCard={() => goAnime(item, directoryData)}
    image={item.anime.cover}
    primaryText={item.anime.name}
    secondaryText={`Episodio ${item.number}`}
    cardsPerRowPortrait={2}
    cardsPerRowLandscape={4}
    primaryOverlay={true}
  />
  const itemSeparator = _ =>
    <VerticalSeparator
      width={screenWidth}
      numCards={mode ? 2 : 4} />

  return <GeneralLayout>
    <FlatList
      data={list}
      ListEmptyComponent={() => <Empty text='Sin animes recientes' />}
      ItemSeparatorComponent={itemSeparator}
      numColumns={mode ? 2 : 4}
      key={mode ? 'v' : 'h'}
      renderItem={renderItem}
      keyExtractor={item => `${item.anime.aid}:${item.number}`}
      contentContainerStyle={{ padding: mode ? screenWidth * 1 / 30 : screenWidth * 1 / 50 }}
      onRefresh={fetchLatestEpisodes}
      refreshing={refreshing}
    />
  </GeneralLayout>
}

const mapStateToProps = state => ({
  list: state.latestEpisodes.episodes, // list
  last: state.latestEpisodes.last, //string
  mode: state.app.device.orientation == PORTRAIT ? true : false, // boolean
  screenWidth: state.app.device.screenSize.width, // number
  refreshing: state.latestEpisodes.areLoading, // boolean
  // directoryUpdating: state.directory.updating,
  directoryData: state.directory.data.animes
})

const mapDispatchToProps = dispatch => ({
  fetchLatestEpisodes: () => dispatch(LatestEpisodesActions.fetchLatestEpisodes()),
  goAnime: (episode, directoryData) => {
    dispatch(AnimeActions.setAnimeData(
      directoryData.find(_anime => _anime.aid == episode.anime.aid), episode.anime.aid))
    navigate('Anime', { name: episode.anime.name })
  },
  playEpisode: ({ number, anime }) => dispatch(VideoPlayerActions.play(anime, number))
})

const RecentScreen = connect(mapStateToProps, mapDispatchToProps)(Recent)
export default RecentScreen