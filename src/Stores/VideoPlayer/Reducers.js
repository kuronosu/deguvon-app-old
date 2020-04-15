import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { VideoPlayerTypes } from './Actions'

export const setData = (state, { title, video }) => ({ title, video })


export const reducer = createReducer(INITIAL_STATE, {
  [VideoPlayerTypes.SET_DATA]: setData
})
