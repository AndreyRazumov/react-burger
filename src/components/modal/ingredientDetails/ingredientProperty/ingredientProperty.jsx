import PropTypes from 'prop-types';
import ingredientPropertyStyles from './ingredientProperty.module.css';

const IngredientProperty = ({ property, value }) => {
  return (
    <li className={ingredientPropertyStyles.item}>
      <p className='text text_type_main-default mb-2'>{property}</p>
      <p className='text text_type_digits-default'>{value}</p>
    </li>
  );
};

IngredientProperty.propTypes = {
  property: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

export default IngredientProperty;