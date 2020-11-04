import * as Types from '../constants/action-type';

let user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;

const initialState = user ? { loggedIn: true, user } : null;

export function authentication(state = initialState, action) {
  switch (action.type) {
    case Types.SIGNIN:
      return {
        loggingIn: true,
        user: action.user
      };
    case Types.SIGNIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case Types.SIGNIN_FAILURE:
      return {};
    case Types.LOGOUT:
      return null;
    default:
      return state
  }
}