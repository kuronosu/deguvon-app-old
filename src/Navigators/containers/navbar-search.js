import React from 'react'
import { connect } from 'react-redux'
import { TextInput, StyleSheet } from 'react-native'

import NavbarSearchLayout from '../components/navbar-search-layout'
import SearchActions from '../../Stores/Search/Actions'
import Icon from '../../Utils/components/icon'
import BackButton from '../components/back-button'

const NavbarSearch = ({ text, onChange }) => (
  <NavbarSearchLayout>
    <TextInput
      style={styles.searchInput}
      onChangeText={onChange}
      value={text}
    />
    <BackButton backImage={() => <Icon set='MaterialIcons' name='close' size={25} color='white' />} />
  </NavbarSearchLayout>
)

const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
    marginVertical: 10,
    marginLeft: 25,
    padding: 0,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    color: 'white'
  }
})

const mapStateToProps = state => ({ text: state.search.text })

const mapDispatchToProps = dispatch => ({ onChange: text => dispatch(SearchActions.changeText(text)) })

export default connect(mapStateToProps, mapDispatchToProps)(NavbarSearch)