import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { SearchTypes } from './Actions'

export const changeText = (state, { text }) => ({
  ...state,
  text
})


export const reducer = createReducer(INITIAL_STATE, {
  [SearchTypes.CHANGE_TEXT]: changeText
})
