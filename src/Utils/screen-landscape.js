import { Dimensions } from 'react-native'

const dimensionsScreen = Dimensions.get('window')
const screen = {
  width: dimensionsScreen.width > dimensionsScreen.height ? dimensionsScreen.width : dimensionsScreen.height,
  height: dimensionsScreen.width < dimensionsScreen.height ? dimensionsScreen.width : dimensionsScreen.height,
  scale: dimensionsScreen.scale,
  fontScale: dimensionsScreen.fontScale
}

const { width, height } = screen

export { width, height }

export default screen