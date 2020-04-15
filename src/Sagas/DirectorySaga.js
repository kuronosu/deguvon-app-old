import { put, call } from 'redux-saga/effects'
import DirectoryActions from '../Stores/Directory/Actions'
import { fetchDirectory as _fetchDirectory } from '../Services/ApiService'
import DropDownHolder from '../Utils/dropdownholder'
// import { userService } from 'App/Services/UserService'

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
export function* fetchDirectory() {
  DropDownHolder.alert('info', 'Actualizando directorio', '')
  yield put(DirectoryActions.fetchDirectoryLoading())
  try {
    const directory = yield call(_fetchDirectory)
    yield put(DirectoryActions.fetchDirectorySuccess(directory))
    DropDownHolder.alert('success', 'Directorio actualizado', '')
  } catch (error) {
    DropDownHolder.alert('error', 'Error', errorMessage)
    yield put(
      DirectoryActions.fetchDirectoryFailure('Error obtener el directorio')
    )
  }
}