import { ingredientsRequest, sendOrder } from '../../utils/api'
import { IIngredient } from '../../utils/types/types';
import { AppThunk } from "../../utils/types";
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    RESET_INGREDIENTS_FAILED,
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    CLEAR_CURRENT_BURGER,
    SET_ORDER_ID_LIST,
    SORT_ORDER,
    GET_AUTH_FAILED
} from '../constants/constants'


export interface IGetIngredientsAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly items: IIngredient[];
}

export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IResetIngredientsFailedAction {
    readonly type: typeof RESET_INGREDIENTS_FAILED;
}


export function getIngredients(): AppThunk {
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



export interface IPostOrderRequestAction {
    readonly type: typeof POST_ORDER_REQUEST;
}
export interface IPostOrderSuccessAction {
    readonly type: typeof POST_ORDER_SUCCESS;
    readonly number: number
}
export interface IPostOrderFailedAction {
    readonly type: typeof POST_ORDER_FAILED;
}

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    readonly ingredient: IIngredient;
}

export interface IDeleteIngredientAction {
    readonly type: typeof DELETE_INGREDIENT;
    readonly index: number;
}

export interface IClearCurrentBurgerAction {
    readonly type: typeof CLEAR_CURRENT_BURGER;
}

export interface ISetOrderIdListAction {
    readonly type: typeof SET_ORDER_ID_LIST;
}

export interface ISortOrderAction {
    readonly type: typeof SORT_ORDER;
    readonly hoverIndex: number;
    readonly dragIndex: number;
}

export function getOrder(order: string[]): AppThunk {
    return function (dispatch) {
        dispatch({
            type: POST_ORDER_REQUEST,
        });

        sendOrder(order)
            .then(res => {
                dispatch({
                    type: POST_ORDER_SUCCESS,
                    number: res.order.number,
                })
            })
            .catch(err => {
                console.log(err)
                dispatch({
                    type: POST_ORDER_FAILED
                });
                dispatch({
                    type: GET_AUTH_FAILED,
                });
            });
    }
}

