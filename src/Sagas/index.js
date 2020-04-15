import { takeLatest, all } from 'redux-saga/effects'
import { LatestEpisodesTypes } from '../Stores/LatestEpisodes/Actions'
import { VideoPlayerTypes } from '../Stores/VideoPlayer/Actions'
import { DirectoryTypes } from '../Stores/Directory/Actions'
import { fetchLatestEpisodes } from './LatestEpisodesSaga'
import { fetchDirectory } from './DirectorySaga'
import { playEpisode } from './VideoSaga'
// import { startup } from './StartupSaga'

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts
    // takeLatest(StartupTypes.STARTUP, startup),
    // Call `fetchUser()` when a `FETCH_USER` action is triggered
    takeLatest(LatestEpisodesTypes.FETCH_LATEST_EPISODES, fetchLatestEpisodes),
    takeLatest(DirectoryTypes.FETCH_DIRECTORY, fetchDirectory),
    takeLatest(VideoPlayerTypes.PLAY, playEpisode),
  ])
}