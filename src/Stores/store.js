import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'

/**
 * This import defaults to localStorage for web and AsyncStorage for react-native.
 *
 * Keep in mind this storage *is not secure*. Do not use it to store sensitive information
 * (like API tokens, private and sensitive data, etc.).
 *
 * If you need to store sensitive information, use redux-persist-sensitive-storage.
 * @see https://github.com/CodingZeal/redux-persist-sensitive-storage
 */
import FilesystemStorage from 'redux-persist-filesystem-storage'

const persistConfig = {
  key: 'root',
  storage: FilesystemStorage,
  blacklist: ['nav', 'navigation', 'search', 'anime', 'latestEpisodes', 'vPlayer'],
}

const addPersist = (reducers, blacklists) => {
  const reducerKeys = Object.keys(reducers)
  Object.keys(blacklists).forEach(reducer => {
    if (reducerKeys.includes(reducer)) {
      reducers[reducer] = persistReducer({
        key: reducer,
        storage: FilesystemStorage,
        blacklist: blacklists[reducer]
      },
        reducers[reducer])
    }
  })
  return reducers
}

export default (reducers, rootSaga) => {
  const rootReducer = combineReducers(addPersist(reducers, {
    latestEpisodes: ['areLoading', 'errorMessage'],
    directory: ['updating', 'errorMessage'],
  }))

  const middleware = []
  const enhancers = []

  // Connect the sagas to the redux store
  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)

  enhancers.push(applyMiddleware(...middleware))

  // Redux persist
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = createStore(persistedReducer, compose(...enhancers))
  const persistor = persistStore(store)

  // Kick off the root saga
  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}
