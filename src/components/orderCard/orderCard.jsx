import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as uuidv4 } from 'uuid';
import { intersection, formatDate } from '../../utils/utils';
import { getIngredients } from '../../services/selectors';
import IngredientImage from '../ingredientImage/ingredientImage';
import styles from './orderCard.module.css';
import { OrderStatus } from '../../utils/const';

const MAX_SHOWED_INGREDIENTS = 5;

const OrderCard = ({ id, ingredientIdList, name, number, created, status = undefined }) => {
  const location = useLocation();
  const { url } = useRouteMatch();

  const ingredientsList = useSelector(getIngredients);
  const { bun, ingredientsArr } = intersection(ingredientIdList, ingredientsList);
  const date = formatDate(created);

  const showedIngredientsList = ingredientsArr.length <= MAX_SHOWED_INGREDIENTS
    ? [...ingredientsArr]
    : ingredientsArr.slice(0, MAX_SHOWED_INGREDIENTS);

  const bunPrice = bun.price ? bun.price * 2 : 0;
  const price = ingredientsArr.reduce((prevValue, item) => prevValue += item.price, bunPrice);

  const unshowedIngredientsCount = ingredientsArr.length - MAX_SHOWED_INGREDIENTS > 0
    ? ingredientsArr.length - MAX_SHOWED_INGREDIENTS
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
            bun._id && <li
              className={styles.ingredients_item}
              style={{
                zIndex: ingredientsArr.length + 2,
              }}
            >
              <IngredientImage
                ingredientUrl={bun.image_mobile}
                ingredientName={bun.name}
                unshowedIngredientsCount={unshowedIngredientsCount}
                isCountShow={false}
              />
            </li>
          }
          {
            !!showedIngredientsList.length && showedIngredientsList.map((ingredient, index) =>
            (
              <li
                key={uuidv4()}
                className={styles.ingredients_item}
                style={{
                  zIndex: ingredientsArr.length + 1 - index,
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