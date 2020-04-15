import React from 'react'
import { HeaderBackButton } from '@react-navigation/stack'
import { back } from '../../Services/NavigationService'

const BackButton = props => (
  <HeaderBackButton
    tintColor='white'
    onPress={back}
    {...props}
  />
)


export default BackButton