import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import HomeNavigatorIcon from './components/home-navigator-icon'
import LatestEpisodesScreen from '../Screens/LatestEpisodes'
import DirectoryScreen from '../Screens/Directory/containers'

const Tab = createMaterialBottomTabNavigator();

function HomeNavigator() {
  return (
    <Tab.Navigator
      activeTintColor='#fff'
      inactiveTintColor='#9E9E9E'
      barStyle={{ backgroundColor: '#558b2f' }}
      labeled={false}
    >
      <Tab.Screen
        name="LatestEpisodes"
        component={LatestEpisodesScreen}
        options={{
          // title: 'Ultimos episodios',
          tabBarIcon: props => <HomeNavigatorIcon iconSet='EvilIcons' name="clock" {...props} />
        }}
      />
      <Tab.Screen
        name="Directory"
        component={DirectoryScreen}
        options={{
          // title: 'Directorio',
          tabBarIcon: props => <HomeNavigatorIcon iconSet='Entypo' name="grid" {...props} />
        }}
      />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  )
}

export default HomeNavigator