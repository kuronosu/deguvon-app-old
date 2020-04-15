import { createReducer } from 'reduxsauce'
import { INITIAL_STATE } from './InitialState'
import { AnimeTypes } from './Actions'

export const setAnimeData = (state, { data, aid }) => ({
  ...state,
  data,
  aid
})
//0 ({
//   ...state,
//   ...anime,
// })

export const reducer = createReducer(INITIAL_STATE, {
  [AnimeTypes.SET_ANIME_DATA]: setAnimeData
})
