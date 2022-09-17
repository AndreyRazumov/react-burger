const API_URL = `https://norma.nomoreparties.space/api/`

const checkResponse = (res) => {    
  return res.ok ?
    res.json() :
    res.json()
      .then(err => Promise.reject(err));
};

function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

export const ingredientsRequest = () => request (`${API_URL}ingredients`)

export const sendOrder = (order) => request (
  `${API_URL}orders`,
  {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ingredients: order})
  }
)

