import { combineReducers } from 'redux';
import {
  currentBurgerReducer,
  ingredientsReducer,
  ingredientReducer,
  orderReducer,
  modalReducer
} from './reducers';

export const rootReducer = combineReducers({
  ingredientsReducer,
  currentBurgerReducer,
  ingredientReducer,
  orderReducer,
  modalReducer,
});