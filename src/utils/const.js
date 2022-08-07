import PropTypes from 'prop-types';

export const ItemType = {
  Bun: {
    type: 'bun',
    name: 'Булки',
  },
  Main: {
    type: 'main',
    name: 'Начинки'
  },
  Sauce: {
    type: 'sauce',
    name: 'Соусы'
  }
}

export const ingridientDataTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['bun', 'main','sauce']).isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired
});

export const itemDataTypes = PropTypes.shape({
  TYPE: PropTypes.string.isRequired,
  NAME: PropTypes.string.isRequired,
});

export const URL = 'https://norma.nomoreparties.space/api/ingredients';