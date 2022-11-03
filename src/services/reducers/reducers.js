import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    RESET_INGREDIENTS_FAILED,
    POST_ORDER_SUCCESS,
    POST_ORDER_REQUEST,
    POST_ORDER_FAILED,
    DELETE_ORDER_DATA,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    ADD_INGREDIENT_DATA,
    DELETE_INGREDIENT_DATA,
    CLEAR_CURRENT_BURGER,
    MOVE_CONSTRUCTOR_ELEMENT,
    OPEN_INGREDIENT_DETAILS,
    CLOSE_INGREDIENT_DETAILS,
    OPEN_ORDER_DETAILS,
    CLOSE_ORDER_DETAILS,
} from '../actions/actions';
import { RequestStatus } from '../../utils/const';

const initialIngredientsState = {
    ingredients: [],
    ingredientsRequest: RequestStatus.idle
};

const initialBurgerState = {
    currentBurger: [],
};

const initialIngredientState = {
    ingredient: {},
};

const initialOrderState = {
    order: {
        number: 0,
    },
    orderRequest: false,
    orderFaied: false,
    orderIngredientsIdRequest: RequestStatus.idle
};

const initialModalState = {
    isIngredientDetailsOpened: false,
    isOrderDetailsOpened: false
};

export const ingredientsReducer = (state = initialIngredientsState, action = {}) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: RequestStatus.pending,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.items,
                ingredientsRequest: RequestStatus.success
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredients: [],
                ingredientsRequest: RequestStatus.failed
            };
        }
        case RESET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsRequest: RequestStatus.idle,
            }
        }
        default: {
            return state;
        }
    }
};

export const currentBurgerReducer = (state = initialBurgerState, action = {}) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            return {
                ...state,
                currentBurger: [...state.currentBurger, action.item],
            };
        }
        case DELETE_INGREDIENT: {
            return {
                ...state,
                currentBurger: [...state.currentBurger].filter((item, index) => index !== action.index),
            };
        }
        case MOVE_CONSTRUCTOR_ELEMENT: {
            return ({
                ...state,
                currentBurger: action.payload,
            });
        }
        case CLEAR_CURRENT_BURGER: {
            return ({
                ...state,
                currentBurger: [],
            });
        }
        default: {
            return state;
        }
    }
};

export const ingredientReducer = (state = initialIngredientState, action = {}) => {
    switch (action.type) {
        case ADD_INGREDIENT_DATA: {
            return {
                ...state,
                ingredient: action.item,
            };
        }
        case DELETE_INGREDIENT_DATA: {
            return {
                ...state,
                ingredient: {},
            };
        }
        default: {
            return state;
        }
    }
};

export const orderReducer = (state = initialOrderState, action) => {
    switch (action.type) {
        case POST_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderIngredientsIdRequest: RequestStatus.pending,
            };
        }
        case POST_ORDER_SUCCESS: {
            return {
                ...state,
                order: action.order,
                orderRequest: false,
                orderFaied: false,
                orderIngredientsIdRequest: RequestStatus.success,
            };
        }
        case POST_ORDER_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderFaied: true,
                orderIngredientsIdRequest: RequestStatus.failed,
            };
        }
        case DELETE_ORDER_DATA: {
            return {
                ...state,
                order: {
                    number: 0,
                },
            };
        }
        default: {
            return state;
        }
    }
};

export const modalReducer = (state = initialModalState, action) => {
    switch (action.type) {
        case (OPEN_INGREDIENT_DETAILS): {
            return { ...state, isIngredientDetailsOpened: true };
        }
        case (CLOSE_INGREDIENT_DETAILS): {
            return { ...state, isIngredientDetailsOpened: false };
        }
        case (OPEN_ORDER_DETAILS): {
            return { ...state, isOrderDetailsOpened: true };
        }
        case (CLOSE_ORDER_DETAILS): {
            return { ...state, isOrderDetailsOpened: false };
        }
        default: {
            return state;
        }
    }
};