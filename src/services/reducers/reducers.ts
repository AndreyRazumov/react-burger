import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  RESET_INGREDIENTS_FAILED,
  POST_ORDER_SUCCESS,
  POST_ORDER_REQUEST,
  POST_ORDER_FAILED,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SET_ORDER_ID_LIST,
  SORT_ORDER,
  CLEAR_CURRENT_BURGER
} from '../constants';
import { IIngredient, TRequestStatus } from "../../utils/types";
import { TActions } from "../../utils/types";
import { correctArr } from "../../utils/utils";

type TIngredientsState = {
  ingredients: IIngredient[] | [];
  ingredientsRequest: TRequestStatus;
};

const initialIngredientsState: TIngredientsState = {
  ingredients: [],
  ingredientsRequest: 'idle'
};



export const ingredientsReducer = (state = initialIngredientsState, action: TActions): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: 'pending',
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.items,
        ingredientsRequest: 'success'
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredients: [],
        ingredientsRequest: 'pending'
      };
    }
    case RESET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: 'idle',
      }
    }
    default: {
      return state;
    }
  }
};



interface IOrder {
  bun: IIngredient | null;
  main: IIngredient[];
}

type TOrderState = {
  order: IOrder;
  orderIngredientsId: string[];
  orderIngredientsIdRequest: TRequestStatus;
  number: number | null;
  price: number;
}

const initialOrderState: TOrderState = {
  order: {
    bun: null,
    main: [],
  },
  orderIngredientsId: [],
  orderIngredientsIdRequest: "idle",
  number: null,
  price: 0,
};
export const orderReducer = (state = initialOrderState, action: TActions): TOrderState => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        order:
          action.ingredient.type === "bun"
            ? {
              ...state.order,
              bun: action.ingredient,
            }
            : {
              ...state.order,
              main: [...state.order.main, action.ingredient],
            },
        price:
          action.ingredient.type === "bun" && state.order.bun
            ? state.price -
            state.order.bun.price * 2 +
            action.ingredient.price * 2
            : action.ingredient.type === "bun"
              ? state.price + action.ingredient.price * 2
              : state.price + action.ingredient.price,
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        order: {
          ...state.order,
          main: state.order.main.filter(
            (item) => item !== state.order.main[action.index]
          ),
        },
        price: state.price - state.order.main[action.index].price,
      };
    }
    case SET_ORDER_ID_LIST: {
      return {
        ...state,
        orderIngredientsId: state.order.bun
          ? [
            state.order.bun._id,
            ...state.order.main.map((it) => it._id),
            state.order.bun._id,
          ]
          : [...state.order.main.map((it) => it._id)],
      };
    }
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderIngredientsIdRequest: "pending",
      };
    }
    case POST_ORDER_FAILED: {
      return {
        ...state,
        orderIngredientsIdRequest: "failed",
      };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        orderIngredientsIdRequest: "success",
        number: action.number,
      };
    }
    case CLEAR_CURRENT_BURGER: {
      return initialOrderState;
    }
    case SORT_ORDER: {
      return {
        ...state,
        order: {
          ...state.order,
          main: correctArr(
            state.order.main,
            action.hoverIndex,
            action.dragIndex
          ),
        },
      };
    }
    default:
      return state;
  }
};
