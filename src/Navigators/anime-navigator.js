// import { NavigationContainer } from 'react-navigation'
// import { createMaterialTopTabNavigator } from 'react-navigation'
// import EpisodeListScreen from '../screens/anime/containers/episode-list'
// import AnimeScreen from '../screens/anime/containers'

// const AnimeNavigator: NavigationContainer = createMaterialTopTabNavigator(
//   {
//     Details: {
//       screen: AnimeScreen,
//       navigationOptions: {
//         title: 'Detalles'
//       }
//     },
//     Episodes: {
//       screen: EpisodeListScreen,
//       navigationOptions: {
//         title: 'Episodios'
//       },
//     },
//   },
//   {
//     tabBarOptions: {
//       activeTintColor: '#fff',
//       style: {
//         backgroundColor: '#85bb5c',
//       },
//     }
//   }
// )
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { AnimeScreen, EpisodeListScreen } from '../Screens/Anime'

const Tab = createMaterialTopTabNavigator()

function AnimeNavigator() {
  return (
    <Tab.Navigator
      backBehavior='none'
      tabBarOptions={{
        activeTintColor: '#fff',
        style: {
          backgroundColor: '#85bb5c',
        },
      }}
    >
      <Tab.Screen title='Detalles' name="AnimeDetails" component={AnimeScreen} />
      <Tab.Screen title='Episodios' name="AnimeEpisodes" component={EpisodeListScreen} />
    </Tab.Navigator>
  )
}

export default AnimeNavigator