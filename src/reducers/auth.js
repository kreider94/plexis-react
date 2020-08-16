import * as actionTypes from '../constants/actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_MAIN_USER:
      return setMe(state, action);
    default:
      return state;
  }
}

function setMe(state, action) {
  const { user } = action;
  return { ...state, user };
}