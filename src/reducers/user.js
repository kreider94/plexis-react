import * as actionTypes from '../constants/actionTypes';

const initialState = {};

function setUser(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return Object.assign({}, state, {
        user: action.user
      })
    case actionTypes.SET_MAIN_USER:
      return Object.assign({}, state, {
        user: action.user
      })
    case actionTypes.ADD_SC_USERS:
      return { ...state, scUsers: action.payload }
    default:
      return state;
  }
}


export default setUser;
