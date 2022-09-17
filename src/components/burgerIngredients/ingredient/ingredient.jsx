import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ingredientDataTypes } from '../../../utils/types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyle from './ingredient.module.css'
import { useDrag } from "react-dnd";

const Ingredient = ({ element, openDetailsModal }) => {
  const currentBurger = useSelector((store) => store.currentBurgerReducer.currentBurger);

  const { image, name, price } = element;

  const count = React.useMemo(() => {
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
    <li onClick={openDetailsModal} className={`${ingredientStyle.list} ml-4 mr-2 mb-8`} ref={dragRef}>
      {0 < count &&
        <Counter count={count} size="default" />
      }
      <img src={image} alt={name} className={`ml-4 mr-4`} />
      <div className={`${ingredientStyle.price} mt-2 mb-2`}>
        <p className={`mr-2 text text_type_digits-default`}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${ingredientStyle.name} text text_type_main-default`}>{name}</p>
    </li>
  )
}

Ingredient.propTypes = {
  element: ingredientDataTypes.isRequired,
  openDetailsModal: PropTypes.func.isRequired
};

export default Ingredient