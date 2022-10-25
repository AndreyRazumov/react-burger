import { getCookie } from './utils'

const API_URL = `https://norma.nomoreparties.space/api/`

const checkResponse = (res) => {
  return res.ok ?
    res.json() :
    res.json()
      .then(err => Promise.reject(err));
};

function request(url, options) {
  return fetch(url, options)
    .then(checkResponse)
}

export const ingredientsRequest = () => request(
  `${API_URL}ingredients`
)

export const sendOrder = (order) => request(
  `${API_URL}orders`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({ ingredients: order })
  }
)

export const registrationRequest = (user) => request(
  `${API_URL}auth/register`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }
);

export const loginRequest = (authData) => request(
  `${API_URL}auth/login`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(authData)
  }
);

export const forgotPassRequest = (email) => request(
  `${API_URL}password-reset`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(email)
  }
);

export const resetPassRequest = (data) => request(
  `${API_URL}password-reset/reset`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }
);

export const refreshTokenRequest = (refreshToken) => request(
  `${API_URL}auth/token`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: refreshToken
    })
  }
);

export const logoutRequest = (refreshToken) => request(
  `${API_URL}auth/logout`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: refreshToken
    })
  }
);

export const authUserRequest = () => request(
  `${API_URL}auth/user`,
  {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('token')
    }
  }
);

export const updateUserRequest = (userData) => request(
  `${API_URL}auth/user`,
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
);
