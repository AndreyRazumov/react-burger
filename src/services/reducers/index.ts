import { combineReducers } from 'redux';
import {
  ingredientsReducer,
  orderReducer
} from './reducers';
import { userReducer } from './user';
import { wsFeedReducer } from './feed';

export const rootReducer = combineReducers({
  ingredientsReducer,
  orderReducer,
  userReducer,
  wsFeedReducer
});