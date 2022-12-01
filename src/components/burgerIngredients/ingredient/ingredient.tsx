import { useMemo, FC } from 'react';
import { useSelector } from '../../../services/hooks';
import { Link, useLocation } from 'react-router-dom';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredient.module.css'
import { useDrag } from "react-dnd";
import { IIngredient } from "../../../utils/types";

const Ingredient: FC<{ ingredient: IIngredient }> = ({ ingredient }) => {
  const { order } = useSelector(store => store.orderReducer);
  const location = useLocation();
  const { image, name, price } = ingredient;

  const count = useMemo(
    () =>
      ingredient.type !== "bun" && order.main.length
        ? order.main.filter((it) => it._id === ingredient._id).length
        : !!order.bun && order.bun._id === ingredient._id
          ? 2
          : 0,
    [order, ingredient._id, ingredient.type]
  );

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient },
  });

  return (
    <Link
      className={style.link}
      to={{
        pathname: `/ingredients/${ingredient._id}`,
        state: { background: location },
      }}
    >
      <li className={`${style.list} ml-4 mr-2 mb-8`} ref={dragRef}>
        {!!count &&
          <Counter count={count} size="default" />
        }
        <img src={image} alt={name} className='ml-4 mr-4' />
        <div className={`${style.price} mt-2 mb-2`}>
          <p className='mr-2 text text_type_digits-default'>{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${style.name} text text_type_main-default`}>{name}</p>
      </li>
    </Link>
  )
}

export default Ingredient