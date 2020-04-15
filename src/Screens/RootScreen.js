import React, { useEffect } from 'react'
import { Dimensions } from 'react-native'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import AppNavigator from '../Navigators/app-navigator'
import AppActions from '../Stores/App/Actions'
import GeneralLayout from '../Utils/components/general-layout'

const listenOrientationChange = action => {
  Dimensions.addEventListener('change', newDimensions => {
    action(newDimensions.window)
  })
}

const removeOrientationListener = () => {
  Dimensions.removeEventListener('change', () => { });
}

const RootScreen = ({ updateDeviceSize }) => {
  useEffect(() => {
    listenOrientationChange(updateDeviceSize)
    return removeOrientationListener
  }, [])
  return (
    <GeneralLayout>
      <AppNavigator />
    </GeneralLayout>
  )
}


RootScreen.propTypes = {
  updateDeviceSize: PropTypes.func,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  updateDeviceSize: newSize => dispatch(AppActions.updateDeviceSize(newSize)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootScreen)
