import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers/index';

const logger = createLogger();
const router = routerMiddleware(createBrowserHistory);

const createStoreWithMiddleware = applyMiddleware(thunk, router, logger)(createStore);

function configureStore(initialState) {
 return createStoreWithMiddleware(rootReducer, initialState);
}

export default configureStore;
