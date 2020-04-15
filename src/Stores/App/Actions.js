import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // update the device size config
  updateDeviceSize: ['window'],
})

export const AppTypes = Types
export default Creators