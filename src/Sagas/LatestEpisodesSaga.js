import { put, call, select } from 'redux-saga/effects'
import LatestEpisodesActions from '../Stores/LatestEpisodes/Actions'
import DirectoryActions from '../Stores/Directory/Actions'
import { fetchLatestEpisodes as _fetchLatestEpisodes } from '../Services/ApiService'
// import { userService } from 'App/Services/UserService'

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
export function* fetchLatestEpisodes() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const last = yield select(state => state.latestEpisodes.last)
  yield put(LatestEpisodesActions.fetchLatestEpisodesLoading())

  // Fetch user informations from an API
  try {
    const latestEpisodes = yield call(_fetchLatestEpisodes) // HERE ASDASDA
    yield put(LatestEpisodesActions.fetchLatestEpisodesSuccess(latestEpisodes))
    if (latestEpisodes.length > 0 && last != latestEpisodes[0].animeflv_url) {
      yield put(DirectoryActions.fetchDirectory())
    }
  } catch (error) {
    yield put(
      LatestEpisodesActions.fetchLatestEpisodesFailure('Error al cargar los ultimos episodios')
    )
  }
}