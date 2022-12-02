import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { rootReducer } from "../../services/reducers";
import {
  IGetIngredientsAction,
  IGetIngredientsSuccessAction,
  IGetIngredientsFailedAction,
  IResetIngredientsFailedAction,
  IPostOrderRequestAction,
  IPostOrderSuccessAction,
  IPostOrderFailedAction,
  IAddIngredientAction,
  IDeleteIngredientAction,
  IClearCurrentBurgerAction,
  ISetOrderIdListAction,
  ISortOrderAction
} from "../../services/actions/actions";
import {
  IWsFeedConnectionStart,
  IWsFeedConnectionAction,
  IWsFeedConnectionClosedAction,
  IWsFeedConnectionErrorAction,
  IWsGetFeed
} from "../../services/actions/feed";
import {
  IUserFormAction,
  IGetAuthAction,
  IGetAuthFailedAction,
  IGetAuthSuccessAction,
  IGetForgotPassAction,
  IGetForgotPassFailedAction,
  IGetForgotPassSuccessAction,
  IGetLoginAction,
  IGetLoginFailedAction,
  IGetLoginSuccessAction,
  IGetLogoutAction,
  IGetLogoutFailedAction,
  IGetLogoutSuccessAction,
  IGetRegistrationAction,
  IGetRegistrationFailedAction,
  IGetRegistrationSuccessAction,
  IGetResetPassAction,
  IGetResetPassFaileAction,
  IGetResetPassSuccessAction,
  IGetUpdateUserAction,
  IGetUpdateUserFailedAction,
  IGetUpdateUserSuccessAction,
  IClearRequestMessageAction
} from "../../services/actions/user";

export type TActions =
  | IGetIngredientsAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | IResetIngredientsFailedAction
  | IPostOrderRequestAction
  | IPostOrderSuccessAction
  | IPostOrderFailedAction
  | IAddIngredientAction
  | IDeleteIngredientAction
  | IClearCurrentBurgerAction
  | IWsFeedConnectionStart
  | IWsFeedConnectionAction
  | IWsFeedConnectionClosedAction
  | IWsFeedConnectionErrorAction
  | IWsGetFeed
  | IUserFormAction
  | IGetAuthAction
  | IGetAuthFailedAction
  | IGetAuthSuccessAction
  | IGetForgotPassAction
  | IGetForgotPassFailedAction
  | IGetForgotPassSuccessAction
  | IGetLoginAction
  | IGetLoginFailedAction
  | IGetLoginSuccessAction
  | IGetLogoutAction
  | IGetLogoutFailedAction
  | IGetLogoutSuccessAction
  | IGetRegistrationAction
  | IGetRegistrationFailedAction
  | IGetRegistrationSuccessAction
  | IGetResetPassAction
  | IGetResetPassFaileAction
  | IGetResetPassSuccessAction
  | IGetUpdateUserAction
  | IGetUpdateUserFailedAction
  | IGetUpdateUserSuccessAction
  | IClearRequestMessageAction
  | ISetOrderIdListAction
  | ISortOrderAction;
export * from "./types";

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<TReturn = void> = ThunkAction<TReturn, RootState, unknown, TActions>;

export type AppDispatch = ThunkDispatch<RootState, never, TActions>;
