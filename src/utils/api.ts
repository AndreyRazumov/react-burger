import { getCookie, setCookie } from './utils'
import {
  IIngredientsRequest,
  ISendOrderResponse,
  IUserData,
  IUpdateUserData,
  IResetPasswordData,
  IRefreshResponse,
  IAuthResponse,
  IInformationResponse,
  IUpdateUserResponse
} from "../utils/types";

const API_URL = `https://norma.nomoreparties.space/api/`

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ?
    res.json() :
    res.json()
      .then(err => Promise.reject(err));
};

async function fetchWithRefresh<T>(url: string, options: RequestInit): Promise<T> {
  try {
    const res = await fetch(url, options);

    return await checkResponse<T>(res);
  } catch (err: any) {
    if (!err.success) {
      const refreshData = await refreshTokenRequest();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      const accessToken = refreshData.accessToken.split("Bearer ")[1];

      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("token", accessToken);

      const requestHeaders: HeadersInit = new Headers();
      requestHeaders.set('authorization', refreshData.accessToken);
      options.headers = requestHeaders;

      const res = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          authorization: refreshData.accessToken,
        },
      });

      return await checkResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
}

export const ingredientsRequest = () => {
  return fetch(`${API_URL}ingredients`).then((res) =>
    checkResponse<IIngredientsRequest>(res)
  )
};


export const sendOrder = (order: Array<string>) => {
  return fetchWithRefresh<ISendOrderResponse>(`${API_URL}orders`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + getCookie('token')
      },
      body: JSON.stringify({ ingredients: order })
    })
}

export const registrationRequest = (user: IUserData & { name: string }) => {
  return fetch(`${API_URL}auth/register`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }).then((res) => checkResponse<IAuthResponse>(res));
};

export const loginRequest = (authData: IUserData) => {
  return fetch(`${API_URL}auth/login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authData)
    }).then((res) => checkResponse<IAuthResponse>(res));
};

export const forgotPassRequest = (email: string) => {
  return fetch(`${API_URL}password-reset`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(email)
    }).then((res) => checkResponse<IInformationResponse>(res));
};

export const resetPassRequest = ({ password, token }: IResetPasswordData) => {
  return fetch(`${API_URL}password-reset/reset`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password,
        token
      })
    }).then((res) => checkResponse<IInformationResponse>(res));
};

export const refreshTokenRequest = (): Promise<IRefreshResponse> => {
  return fetch(`${API_URL}auth/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken")
      })
    }).then((res) => checkResponse<IRefreshResponse>(res));
}

export const logoutRequest = () => {
  return fetchWithRefresh<IInformationResponse>(
    `${API_URL}auth/logout`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken")
      })
    }
  )
};

export const authUserRequest = () => {
  return fetchWithRefresh<IAuthResponse>(`${API_URL}auth/user`,
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + getCookie('token')
      }
    }
  )
};

export const updateUserRequest = (userData: IUpdateUserData) => {
  return fetchWithRefresh<IUpdateUserResponse>(`${API_URL}auth/user`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + getCookie('token')
      },
      body: JSON.stringify({
        name: userData?.name,
        email: userData?.email,
        password: userData?.password
      })
    }
  )
};
