import { combineReducers } from 'redux';

import { authentication } from './authentication-reducer';
import {userReducer} from './user-reducer';
import {teamReducer, editReducer} from './team-reducer';
const rootReducer = combineReducers({
  authentication,
  userReducer,
  teamReducer,
  editReducer
});

export default rootReducer;