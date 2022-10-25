import { combineReducers } from 'redux';
import {
  currentBurgerReducer,
  ingredientsReducer,
  ingredientReducer,
  orderReducer,
  modalReducer
} from './reducers';
import { userReducer } from './user';
import { wsFeedReducer } from './feed';

export const rootReducer = combineReducers({
  ingredientsReducer,
  currentBurgerReducer,
  ingredientReducer,
  orderReducer,
  modalReducer,
  userReducer,
  wsFeedReducer
});