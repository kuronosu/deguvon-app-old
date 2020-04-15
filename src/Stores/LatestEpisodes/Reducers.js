import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { LatestEpisodesTypes } from './Actions'
import DropDownHolder from '../../Utils/dropdownholder'

export const fetchLatestEpisodesLoading = (state) => ({
  ...state,
  areLoading: true,
  errorMessage: null,
})

export const fetchLatestEpisodesSuccess = (state, { latestEpisodes }) => ({
  ...state,
  episodes: latestEpisodes,
  areLoading: false,
  errorMessage: null,
  last: latestEpisodes[0].animeflv_url
})

export const fetchLatestEpisodesFailure = (state, { errorMessage }) => {
  DropDownHolder.alert('error', 'Error', errorMessage)
  return ({
    ...state,
    // episodes: [],
    areLoading: false,
    errorMessage: errorMessage,
  })
}
export const clearLastEpisode = state => ({
  ...state,
  last: null
})

export const reducer = createReducer(INITIAL_STATE, {
  [LatestEpisodesTypes.FETCH_LATEST_EPISODES_LOADING]: fetchLatestEpisodesLoading,
  [LatestEpisodesTypes.FETCH_LATEST_EPISODES_SUCCESS]: fetchLatestEpisodesSuccess,
  [LatestEpisodesTypes.FETCH_LATEST_EPISODES_FAILURE]: fetchLatestEpisodesFailure,
  [LatestEpisodesTypes.CLEAR_LAST]: clearLastEpisode,
})
