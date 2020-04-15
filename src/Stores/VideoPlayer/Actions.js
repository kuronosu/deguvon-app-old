import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  setData: ['title', 'video'],
  play: ['anime', 'episode']
})

export const VideoPlayerTypes = Types
export default Creators
