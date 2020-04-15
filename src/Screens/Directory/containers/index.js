import React, { Component } from 'react'
import { DispatchProp, connect } from 'react-redux'
import { FlatList, Dimensions } from 'react-native'
// import { NavigationActions } from 'react-navigation'
import { Portal } from 'react-native-paper'
// import { DirectoryModel, Option, SortValue, IntObject, Generic } from '../../../index'
import { PORTRAIT } from '../../../Stores/App/InitialState'
import Card from '../../../Utils/components/card'
import Empty from '../../../Utils/components/empty'
// import { setAnimeData } from '../../../store/actions'
// import { StoreState, AnimeModel } from '../../../'
import FilterMaganer from '../../../Utils/filter-maganer'
import VerticalSeparator from '../../../Utils/components/separator'
import GeneralLayout from '../../../Utils/components/general-layout'
// import withHandlePressBack from '../../../navigation/handle-press-back'
import DirectoryFloatActionButton from '../components/float-action-button'
import OptionDialog from './sort-dialog'
import AnimeActions from '../../../Stores/Anime/Actions'
import { navigate } from '../../../Services/NavigationService'

const getFirstElementFromIntObject = (obj/*: IntObject*/)/*: string | undefined */ => {
  const tmp = Object.keys(obj)
  if (tmp.length > 0) {
    return obj[parseInt(tmp[0])]
  }
  return undefined
}

const getFirstkeyFromIntObject = (obj/*: IntObject*/)/*: number | undefined*/ => {
  const tmp = Object.keys(obj)
  if (tmp.length > 0) {
    return parseInt(tmp[0])
  }
  return undefined
}

const intObjectToOptionList = (obj/*: IntObject*/)/*: Option[]*/ => {
  const generics/*: Option[]*/ = []
  Object.entries(obj).forEach(([key, value]) => {
    generics.push({
      value: parseInt(key),
      name: value
    })
  })
  return generics
}

const sortOptions = [
  {
    name: 'Anime id',
    value: 'aid'
  },
  {
    name: 'Nombre',
    value: 'name'
  },
  {
    name: 'Calificaión',
    value: 'score'
  }
]

class Directory extends Component/*<Props & DispatchProp, State> */ {
  filterObject//: FilterMaganer
  state//: State

  constructor(props/*: Props & DispatchProp*/) {
    super(props);
    this.state = { data: props.data.animes, visibleSortDialog: false, visibleTypeDialog: false }
    this.filterObject = new FilterMaganer(props.data.animes)
  }

  _onPressAnimeCard = (anime/*: AnimeModel*/) => {
    // this.props.dispatch(setAnimeData(anime))
    // this.props.dispatch(NavigationActions.navigate({
    //   routeName: 'Anime',
    //   params: { title: anime.name }
    // }))
  }

  _renderEmtpy = () => <Empty text='Directorio vacio' />

  _itemSeparator = () => <VerticalSeparator width={this.props.screenWidth} numCards={this.props.mode ? 3 : 4} />

  _keyExtractor = (item/*: AnimeModel*/) => `anime_${item.aid}`

  _renderItem = ({ item, index }/*: { item: AnimeModel, index: number }*/) => <Card
    pressData={item}
    mode={this.props.mode}
    screenWidth={this.props.screenWidth}
    index={index}
    onPressCard={() => this.props.goAnime(item)}
    image={item.cover}
    primaryText={item.name}
    secondaryText={this.props.data.types[item.typea]}
    cardsPerRowPortrait={3}
    cardsPerRowLandscape={4}
  />

  _filter = () => {
    this.setState({ data: this.filterObject.next().data })
  }

  showDialog = (dialog/*: dialogs*/) => {
    this.setState({ ...this.state, [dialog]: true })
  }
  _showSortDialog = () => { this.setState({ visibleSortDialog: true }) }

  hideDialog = (dialog/*: dialogs*/) => {
    this.setState({ ...this.state, [dialog]: false })
  }
  _hideSortDialog = () => { this.setState({ visibleTypeDialog: false }) }

  // Para futuros usos
  // _getItemLayout = (data, index) => {
  //   const ITEM_HEIGHT = (this.props.screenWidth / (238 / 339)) * ( this.props.mode ? 0.3: 0.225 )
  //   console.log(ITEM_HEIGHT, ITEM_HEIGHT + 43.5)
  //   return {length: ITEM_HEIGHT + 43.5, offset: ITEM_HEIGHT * index, index}
  // }

  _sort = (list/*: AnimeModel[]*/, value/*: SortValue*/, upward/*: boolean*/) => {
    let tmp = [...list]
    let orderMultiplier = upward ? 1 : -1
    tmp.sort((a, b) => {
      if (a[value] > b[value]) {
        return 1 * orderMultiplier
      } else if (a[value] < b[value]) {
        return -1 * orderMultiplier
      }
      return 0
    })
    // console.error(tmp[0].aid)
    this.setState({ ...this.state, data: tmp })
  }

  sort = (value/*: string*/, upward/*: boolean*/) => {
    this._sort(this.props.data.animes, value /*as SortValue*/, upward)
  }

  componentDidMount() {
    this.setState({ data: this.props.data.animes })
  }

  render() {
    return (
      <GeneralLayout>
        <Portal.Host>
          <FlatList
            data={this.state.data}
            ListEmptyComponent={this._renderEmtpy}
            ItemSeparatorComponent={this._itemSeparator}
            numColumns={this.props.mode ? 3 : 4}
            key={this.props.mode ? 'v' : 'h'}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            contentContainerStyle={{ padding: this.props.mode ? this.props.screenWidth * 1 / 40 : this.props.screenWidth * 1 / 50 }}
            // getItemLayout={this._getItemLayout} // Posible optimizacion
            initialNumToRender={12}
            removeClippedSubviews
          />
          <DirectoryFloatActionButton
            filterText={this.filterObject.getText()}
            sortText={`${this.state.visibleTypeDialog}`}
            handlePressFilter={() => this.showDialog('visibleTypeDialog')}
            handlePressSort={() => this.showDialog('visibleSortDialog')}
          />

          <OptionDialog //Sort
            visible={this.state.visibleSortDialog}
            hideDialog={() => this.hideDialog('visibleSortDialog')}
            options={sortOptions}
            onOk={this.sort}
            defaultRadioValue='aid'
            title='Ordenar por:'
          />

          <OptionDialog //Type
            visible={this.state.visibleTypeDialog}
            hideDialog={() => this.hideDialog('visibleTypeDialog')}
            options={intObjectToOptionList(this.props.data.types)}
            onOk={(a, b) => { }}
            defaultRadioValue={getFirstElementFromIntObject(this.props.data.types)}
            checkProps={{ use: false }}
            title='Filtrar por:'
          />

        </Portal.Host>
      </GeneralLayout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.directory.data,
    // updated: state.directory.updated,
    mode: state.app.device.orientation == PORTRAIT ? true : false,
    screenWidth: state.app.device.screenSize.width,
    updating: state.directory.updating
  }
}

const mapDispatchToProps = dispatch => ({
  goAnime: async anime => {
    await dispatch(AnimeActions.setAnimeData(anime, anime.aid))
    navigate('Anime', { name: anime.name })
  }
})

export default DirectoryScreen = connect(mapStateToProps, mapDispatchToProps)(Directory)