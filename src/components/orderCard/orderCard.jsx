import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { intersection, formatDate } from '../../utils/utils';
import { getOrders, getIngredients } from '../../services/selectors';
import IngredientImage from '../ingredientImage/ingredientImage';
import styles from './orderCard.module.css';
import { OrderStatus } from '../../utils/const';

const MAX_SHOWED_INGREDIENTS = 6;

const OrderCard = ({ id, ingredientIdList, name, number, created, status = undefined }) => {
  const location = useLocation();
  const { url } = useRouteMatch();
  const orders = useSelector(getOrders);
  const order = orders.find(it => it._id === id);
  const ingredientsList = useSelector(getIngredients);
  const { bun, ingredientsArr } = intersection(ingredientIdList, ingredientsList);
  const bunPrice = bun.price ? bun.price * 2 : 0;
  const price = ingredientsArr.reduce((prevValue, item) => prevValue += item.price, bunPrice);
  const date = formatDate(created);
  const ingrArr = []

  ingredientsList.map(el => {
    const data = order.ingredients.find(item => el._id === item);
    if (data) {
      ingrArr.push(el);
    }
  }, 0);

  const showedIngredientsList = ingrArr.length <= MAX_SHOWED_INGREDIENTS
    ? [...ingrArr]
    : ingrArr.slice(0, MAX_SHOWED_INGREDIENTS);

  const unshowedIngredientsCount = ingrArr.length - MAX_SHOWED_INGREDIENTS > 0
    ? ingrArr.length - MAX_SHOWED_INGREDIENTS
    : 0;

  return (
    <li className={styles.item}>
      <Link
        className={styles.link}
        to={{
          pathname: `${url}/${id}`,
          state: { background: location }
        }}
      >
        <p className={styles.number}>#{number}</p>
        <time className={styles.time}>{date}</time>
        <h3 className={styles.title}>{name}</h3>
        {status && <p className='text text_type_main-default mt-2'>{OrderStatus[status]}</p>}
        <ul className={`${styles.ingredients_list} mt-6`}>
          {
            !!showedIngredientsList.length && showedIngredientsList.map((ingredient, index) =>
            (
              <li
                key={ingredient._id}
                className={styles.ingredients_item}
                style={{
                  zIndex: ingrArr.length + 1 - index,
                }}
              >
                <IngredientImage
                  ingredientUrl={ingredient.image_mobile}
                  ingredientName={ingredient.name}
                  unshowedIngredientsCount={unshowedIngredientsCount}
                  isCountShow={showedIngredientsList.length - 1 === index}
                />
              </li>
            )
            )
          }
        </ul>
        <p className={styles.price}>{price} <CurrencyIcon type='primary' /></p>
      </Link>
    </li>
  );
};

OrderCard.propTypes = {
  id: PropTypes.string.isRequired,
  ingredientIdList: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  created: PropTypes.string.isRequired,
  status: PropTypes.string
};

export default OrderCard;