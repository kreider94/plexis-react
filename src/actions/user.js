import * as actionTypes from '../constants/actionTypes';

export function setUser(user) {
  return { type: actionTypes.SET_USER, user };
};

export function setScUsers(users) {
  return { type: actionTypes.ADD_SC_USERS, users }
}
