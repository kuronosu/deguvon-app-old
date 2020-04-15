import React from 'react'
import { navigate } from '../../Services/NavigationService'
import Icon from '../../Utils/components/icon'

const SearchButton = () => (
  <Icon
    set='Ionicons'
    name="ios-search"
    size={25}
    color='white'
    onPress={() => {
      navigate('Search')
    }}
  />
)

export default SearchButton