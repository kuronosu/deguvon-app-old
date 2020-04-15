import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  setAnimeData: ['data', 'aid'],
})

export const AnimeTypes = Types
export default Creators
