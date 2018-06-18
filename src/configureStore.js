import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage

import historyMiddleware from './middleware/history'
import authenticationMiddleware from './middleware/authentication'
import reloadMiddleware from './middleware/reload'
import history from './utils/history'
import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage,
  // NOTE:
  // - we could add ['boards', 'lists', 'cards'], as well but the data would
  //   be old with every refresh and the user _most likely_ does not want this!
  // TODO
  // - define what to persist
  whitelist: ['app'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Setup Redux store
export const store = createStore(
  connectRouter(history)(persistedReducer),
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history),
      historyMiddleware,
      authenticationMiddleware,
      reloadMiddleware,
    ),
  ),
)

export const persistor = persistStore(store)
