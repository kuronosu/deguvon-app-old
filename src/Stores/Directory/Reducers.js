import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { DirectoryTypes } from './Actions'
import DropDownHolder from '../../Utils/dropdownholder'

export const fetchDirectoryLoading = (state) => {
  // DropDownHolder.alert('info', 'Actualizando directorio', '')
  return ({
    ...state,
    updating: true,
    errorMessage: null,
  })
}

export const fetchDirectorySuccess = (state, { directory }) => {
  // DropDownHolder.alert('success', 'Directorio actualizado', '')
  return ({
    ...state,
    data: directory,
    updating: false,
    errorMessage: null,
  })
}

export const fetchDirectoryFailure = (state, { errorMessage }) => {
  // DropDownHolder.alert('error', 'Error', errorMessage)
  return ({
    ...state,
    // data: [],
    updating: false,
    errorMessage: errorMessage,
  })
}


export const reducer = createReducer(INITIAL_STATE, {
  [DirectoryTypes.FETCH_DIRECTORY_LOADING]: fetchDirectoryLoading,
  [DirectoryTypes.FETCH_DIRECTORY_SUCCESS]: fetchDirectorySuccess,
  [DirectoryTypes.FETCH_DIRECTORY_FAILURE]: fetchDirectoryFailure,
})
