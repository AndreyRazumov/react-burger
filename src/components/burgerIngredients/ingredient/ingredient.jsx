import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ingredientDataTypes } from '../../../utils/types';
import { Link, useLocation } from 'react-router-dom';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredient.module.css'
import { useDrag } from "react-dnd";

const Ingredient = ({ element, openDetailsModal }) => {
  const currentBurger = useSelector(store => store.currentBurgerReducer.currentBurger);
  const location = useLocation();
  const { image, name, price } = element;
  const ingredientId = element._id;

  const count = useMemo(() => {
    return (
      currentBurger.filter((item) => item.type === 'bun' && item._id === element._id).length * 2
      || currentBurger.filter((item) => item._id === element._id).length
    );
  }, [currentBurger]);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: element,
  });

  return (
    <Link
      className={`${style.link}`}
      key={ingredientId}
      to={{
        pathname: `/ingredients/${ingredientId}`,
        state: { background: location },
      }}
    >
      <li onClick={openDetailsModal} className={`${style.list} ml-4 mr-2 mb-8`} ref={dragRef}>
        {0 < count &&
          <Counter count={count} size="default" />
        }
        <img src={image} alt={name} className={`ml-4 mr-4`} />
        <div className={`${style.price} mt-2 mb-2`}>
          <p className={`mr-2 text text_type_digits-default`}>{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${style.name} text text_type_main-default`}>{name}</p>
      </li>
    </Link>
  )
}

Ingredient.propTypes = {
  element: ingredientDataTypes.isRequired,
  openDetailsModal: PropTypes.func.isRequired
};

export default Ingredient