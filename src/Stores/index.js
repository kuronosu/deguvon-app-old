import newStore from './store'
import rootSaga from '../Sagas'
import { reducer as AppReducer } from './App/Reducers'
import { reducer as LatestEpisodesReducer } from './LatestEpisodes/Reducers'
import { reducer as DirectoryReducer } from './Directory/Reducers'
import { reducer as SearchReducer } from './Search/Reducers'
import { reducer as AnimeReducer } from './Anime/Reducers'
import { reducer as VideoPlayerReducer } from './VideoPlayer/Reducers'

export default () => {

  const reducers = {
    app: AppReducer,
    latestEpisodes: LatestEpisodesReducer,
    directory: DirectoryReducer,
    search: SearchReducer,
    anime: AnimeReducer,
    vPlayer: VideoPlayerReducer
  }

  return newStore(reducers, rootSaga)
}
