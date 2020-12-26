import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from '../reducers/index'

const router = routerMiddleware(createBrowserHistory);
// const logger = createLogger();

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['router']
}

const createStoreWithMiddleware = applyMiddleware(thunk, router)(createStore);

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStoreWithMiddleware(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}
