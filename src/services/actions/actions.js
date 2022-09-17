import { ingredientsRequest, sendOrder } from '../../utils/api'

export const SET_ACTIVE_INGREDIENT = 'SET_ACTIVE_INGREDIENT';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const ADD_INGREDIENT_DATA = 'ADD_INGREDIENT_DATA';
export const DELETE_INGREDIENT_DATA = 'DELETE_INGREDIENT_DATA';
export const MOVE_CONSTRUCTOR_ELEMENT = 'MOVE_CONSTRUCTOR_ELEMENT';
export const OPEN_INGREDIENT_DETAILS = 'OPEN_INGREDIENT_DETAILS';
export const CLOSE_INGREDIENT_DETAILS = 'CLOSE_INGREDIENT_DETAILS';
export const OPEN_ORDER_DETAILS = 'OPEN_ORDER_DETAILS';
export const CLOSE_ORDER_DETAILS = 'CLOSE_ORDER_DETAILS';

export function getIngredients() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST,
        });

        ingredientsRequest()
            .then(res => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    items: res.data,
                })
            })
            .catch(err => {
                console.log(err)
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                })
            });
    }
};


export function getOrder(order) {
    return function (dispatch) {
        dispatch({
            type: POST_ORDER_REQUEST,
        });

        sendOrder(order)
            .then(res => {
                dispatch({
                    type: POST_ORDER_SUCCESS,
                    order: res.order
                })
            })
            .catch(err => {
                console.log(err)
                dispatch({
                    type: POST_ORDER_FAILED
                })
            });
    }
}