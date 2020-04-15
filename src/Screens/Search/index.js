import React from 'react'
import { FlatList, addons } from 'react-native'
import { connect } from 'react-redux'

import GeneralLayout from '../../Utils/components/general-layout'
import VerticalSeparator from '../../Utils/components/separator'
import { navigate } from '../../Services/NavigationService'
import { PORTRAIT } from '../../Stores/App/InitialState'
import AnimeActions from '../../Stores/Anime/Actions'
import Empty from '../../Utils/components/empty'
import Card from '../../Utils/components/card'

const _renderEmtpy = () => <Empty text='Sin resultados' />

const _itemSeparator = (mode, width) => <VerticalSeparator width={width} numCards={mode ? 3 : 4} />

const _keyExtractor = item => `anime_${item.aid}`

const _renderItem = ({ item, index }, mode, screenWidth, types, goAnime) => <Card
  pressData={item}
  mode={mode}
  screenWidth={screenWidth}
  index={index}
  onPressCard={() => goAnime(item)}
  image={item.cover}
  primaryText={item.name}
  secondaryText={types[item.typea]}
  cardsPerRowPortrait={3}
  cardsPerRowLandscape={4}
/>

let savedSearchs = {}

const Search = ({ searchText, directoryData, mode, screenWidth, goAnime }) => {
  if (!savedSearchs.hasOwnProperty(searchText)){
    savedSearchs[searchText] = directoryData.animes.filter(el => el.name.toLowerCase().includes(searchText.toLowerCase()))
  }

  return <GeneralLayout>
    <FlatList
      data={savedSearchs[searchText]}
      ListEmptyComponent={_renderEmtpy}
      ItemSeparatorComponent={() => _itemSeparator(mode, screenWidth)}
      numColumns={mode ? 3 : 4}
      key={mode ? 'v' : 'h'}
      renderItem={i => _renderItem(i, mode, screenWidth, directoryData.types, goAnime)}
      keyExtractor={_keyExtractor}
      contentContainerStyle={{ padding: mode ? screenWidth * 1 / 40 : screenWidth * 1 / 50 }}
      // getItemLayout={this._getItemLayout} // Posible optimizacion
      initialNumToRender={12}
      removeClippedSubviews
    />
  </GeneralLayout>
}

const mapStateToProps = state => ({
  searchText: state.search.text,
  directoryData: state.directory.data,
  mode: state.app.device.orientation == PORTRAIT ? true : false,
  screenWidth: state.app.device.screenSize.width
})

const mapDispatchToProps = dispatch => ({
  goAnime: anime => {
    dispatch(AnimeActions.setAnimeData(anime, anime.aid))
    navigate('Anime', { name: anime.name })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)