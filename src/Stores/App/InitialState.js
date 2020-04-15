/**
 * The initial values for the redux state.
 */
import { Dimensions } from "react-native"

const window = Dimensions.get('window')
export const PORTRAIT = 'portrait'
export const LANDSCAPE = 'landscape'

export const INITIAL_STATE = {
  device: {
    orientation: window.width < window.height ? PORTRAIT : LANDSCAPE,
    screenSize: window
  },
}
