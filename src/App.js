import React, { Component, Fragment, useEffect } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import DropdownAlert from 'react-native-dropdownalert'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider as PaperProvider } from 'react-native-paper'
import createStore from './Stores'
import RootScreen from './Screens/RootScreen'
import DropDownHolder from './Utils/dropdownholder'
import Loading from './Utils/components/Loding'

const { store, persistor } = createStore()

export default App = () => (
  <Fragment>
    <StoreProvider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <PaperProvider>
          <RootScreen />
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
    <DropdownAlert ref={ref => DropDownHolder.setDropDown(ref)} closeInterval={4000} />
  </Fragment>
)

