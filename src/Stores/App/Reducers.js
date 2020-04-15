import { INITIAL_STATE, PORTRAIT, LANDSCAPE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { AppTypes as AppTypes } from './Actions'

export const updateDeviceSize = (state, { window }) => ({
  ...state,
  device: {
    orientation: window.width < window.height ? PORTRAIT : LANDSCAPE,
    screenSize: window
  },
})


export const reducer = createReducer(INITIAL_STATE, {
  [AppTypes.UPDATE_DEVICE_SIZE]: updateDeviceSize,
})
