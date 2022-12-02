
export interface IIngredient {
  _id: string;
  uuid?: string;
  index?: number;
  name: string;
  type: TIngredient;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export interface IOrder {
  _id: string;
  ingredients: Array<string>;
  status: "done" | "created" | "pending";
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}
export type TRequestStatus = "idle" | "pending" | "success" | "failed";

export interface IUserData {
  email: string;
  password: string;
}

export interface IResetPasswordData {
  password: string;
  token: string;
}

export interface IRegistrationUserData {
  name: string;
  email: string;
  password: string;
}

export interface IUpdateUserData {
  name?: string;
  email?: string;
  password?: string;
}

export type TInput = {
  name: string;
  value: string;
};

export interface IRefreshResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface IIngredientsRequest {
  data: IIngredient[];
}

export interface ISendOrderResponse {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

export interface IAuthResponse {
  success: string;
  accessToken: string;
  refreshToken: string;
  user: {
    name: string;
    email: string;
  };
}

export interface IInformationResponse {
  success: string;
  message: string;
}

export interface IUpdateUserResponse {
  success: string;
  user: {
    name: string;
    email: string;
  };
}
export type TIngredient = "bun" | "main" | "sauce";