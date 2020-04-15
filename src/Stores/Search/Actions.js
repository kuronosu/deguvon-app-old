import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  changeText: ['text'],
})

export const SearchTypes = Types
export default Creators
