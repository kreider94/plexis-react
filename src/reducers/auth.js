import * as actionTypes from '../constants/actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_MAIN_USER:
      return Object.assign({}, state, {
        user: action.user
      })
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
