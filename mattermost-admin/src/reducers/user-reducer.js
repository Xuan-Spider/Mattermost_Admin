import * as Types from '../constants/action-type';

const initialState = {isSucess : false};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case Types.SIGNUP:
      return {
        isSucess: true,
        user: action.user
      };
    case Types.LOGOUT:
      return null;
    default:
      return state
  }
}