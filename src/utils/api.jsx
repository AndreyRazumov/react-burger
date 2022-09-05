const API_URL = `https://norma.nomoreparties.space/api/`

const fetchData = (res) => {    
  return res.ok ?
    res.json() :
    res.json()
      .then(err => Promise.reject(err));
};


function getIngredients(apiData, setApiData) {
setApiData({ ...apiData, hasError: false, isLoading: true });
  fetch(`${API_URL}ingredients`)
    .then(fetchData)
    .then(res => setApiData({ ...apiData, data: res.data, isLoading: false }))
    .catch(err => {
      setApiData({ isLoading: false, hasError: true, errorMessage: err.message })
    });
  }

function sendOrder (order) {
  return fetch(`${API_URL}orders`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ingredients: order})
  })
  .then(fetchData)
  .then(res => res.order.number)
  .catch(err => console.log(err)) 
}

export { getIngredients, sendOrder }