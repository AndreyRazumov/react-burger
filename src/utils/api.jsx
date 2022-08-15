import PropTypes from 'prop-types';
import { ingredientDataTypes } from './types';
const API_URL = `https://norma.nomoreparties.space/api/ingredients`

const fetchData = (url) => {
    return fetch(url)
      .then(res => res.ok ?
        res.json() :
        res.json()
          .then(err => Promise.reject(err))
    );
};


function getIngredients(apiData, setApiData) {
setApiData({ ...apiData, hasError: false, isLoading: true });
  fetchData(API_URL)
    .then(res => setApiData({ ...apiData, data: res.data, isLoading: false }))
    .catch(err => {
      setApiData({ isLoading: false, hasError: true, errorMessage: err.message })
    });
  }
  getIngredients.propTypes = {
    apiData: PropTypes.arrayOf(ingredientDataTypes).isRequired,
    setApiData: PropTypes.func.isRequired
  };

export default getIngredients