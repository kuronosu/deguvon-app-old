import { put, call, select } from 'redux-saga/effects'
import VideoPlayerActions from '../Stores/VideoPlayer/Actions'
import { fetchEpisode } from '../Services/ApiService'
import { getVideo } from '../Services/ServersService'
import { navigate } from '../Services/NavigationService'

export function* playEpisode({ anime, episode }) {
  try {
    const videoData = yield call(getVideo, anime.aid, episode, 'natsuki')
    yield put(VideoPlayerActions.setData(anime.name, videoData.videos[0].file))
    navigate('VideoPlayer')
  } catch (error) {
    console.error(error)
  }
}