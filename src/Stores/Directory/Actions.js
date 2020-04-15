import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Fetch anime directory
  fetchDirectory: null,
  // The operation has started and is loading
  fetchDirectoryLoading: null,
  // Directory information were successfully fetched
  fetchDirectorySuccess: ['directory'],
  // An error occurred
  fetchDirectoryFailure: ['errorMessage'],
})

export const DirectoryTypes = Types
export default Creators
