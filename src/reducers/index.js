import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import auth from './auth';

export default combineReducers({
  user,
  auth,
  routing: routerReducer
});
