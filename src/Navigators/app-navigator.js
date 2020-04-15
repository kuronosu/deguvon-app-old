import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeNavigator from './home-navigator'
// import AnimeNavigator from './anime-navigator'
import SearchButton from './containers/search-button'
import { navigationRef } from '../Services/NavigationService'
import NavbarSearch from './containers/navbar-search'
import AnimeNavigator from './anime-navigator'
import SearchScreen from '../Screens/Search'
import VideoPlayerScreen from '../Screens/VideoPlayer'
// import VideoPlayer from '../screens/player/containers'

// const AppNavigator = createStackNavigator(
// {
//   Home: {
//     screen: HomeNavigator,
//     navigationOptions: ({ navigation }) => {
//       if (navigation.state.routes[navigation.state.index].key == 'Directory')
//         return { title: 'Directorio' }
//       else if (navigation.state.routes[navigation.state.index].key == 'Config')
//         return { title: 'Configuracion' }
//       return {}
//     }
//   },
//   Anime: {
//     screen: AnimeNavigator,
//     navigationOptions: ({ navigation }: NavigationInjectedProps) => {
//       return { title: navigation.getParam('title', 'Anime') }
//     }
//   },
//   Search: {
//     screen: SearchScreen,
//     navigationOptions: ({ navigation }: NavigationInjectedProps) => {
//       return {
//         header: (props: HeaderProps) => <NavbarSearch {...props} onChangeText={navigation.state.params ? navigation.state.params.handleChangeText : () => { }} />
//       }
//     }
//   },
//   Player: {
//     screen: VideoPlayer,
//     navigationOptions: {
//       headerVisible: false,
//       headerMode: 'none',
//       header: null
//     }
//   }
//   },
//   {
//     defaultNavigationOptions: {
//       title: "Deguvon",
//       headerTintColor: 'white',
//       headerStyle: {
//         backgroundColor: '#558b2f'
//       },
//       headerTitleStyle: {
//         color: 'white',
//         fontWeight: 'normal'
//       },
//       headerRight: <SearchButton />,
//       headerRightContainerStyle: {
//         marginRight: 20
//       }
//     },
//   }
// )

const Stack = createStackNavigator()
function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          title: "Deguvon",
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#558b2f'
          },
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'normal'
          },
          headerRight: () => <SearchButton />,
          headerRightContainerStyle: {
            marginRight: 20
          }
        }}
      >
        <Stack.Screen name="Home" component={HomeNavigator} />
        <Stack.Screen name="Search" component={SearchScreen}
          options={{ header: () => <NavbarSearch /> }} />
        <Stack.Screen name="Anime" component={AnimeNavigator}
          options={({ route }) => ({ title: route.params.name })} />
        <Stack.Screen name='VideoPlayer' component={VideoPlayerScreen}
          options={{ headerShown: false, safeAreaInsets: { left: 0, right: 0, top: 0, bottom: 0 } }}
        />
        {/* <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator