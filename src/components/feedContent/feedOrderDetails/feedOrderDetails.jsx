import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getOrders, getIngredients } from '../../../services/selectors';
import { formatDate, intersection } from '../../../utils/utils';
import styles from './feedOrderDetails.module.css';
import { OrderStatus } from '../../../utils/const';
import IngredientImage from '../../ingredientImage/ingredientImage';
import { v4 as uuidv4 } from 'uuid';

const FeedOrderDetails = () => {
  const { id } = useParams();
  const orders = useSelector(getOrders);
  const order = orders.find(it => it._id === id);
  const ingredientsList = useSelector(getIngredients);
  const { bun, ingredientsArr } = intersection(order.ingredients, ingredientsList);
  const bunPrice = bun.price ? bun.price * 2 : 0;
  const price = ingredientsArr.reduce((prevValue, item) => prevValue += item.price, bunPrice);
  const date = formatDate(order.createdAt);
  return (
    <div>
      <header>
        <p className='text text_type_digits-default'>#{order.number}</p>
        <h3 className='text text_type_main-medium mt-10'>{order.name}</h3>
        <p className={styles.status}>{OrderStatus[order.status]}</p>
      </header>
      <p className='text text_type_main-medium mt-15'>Состав:</p>
      <ul className={`${styles.list} mt-6`}>
        {
          bun._id && <li className={styles.item}>
            <IngredientImage ingredientUrl={bun.image_mobile} ingredientName={bun.name} />
            <p className='text text_type_main-default'>{bun.name}</p>
            <p className={styles.price}>2 x {bun.price}&nbsp;<CurrencyIcon /></p>
          </li>
        }
        {
          ingredientsArr.length && ingredientsArr.map(ingredient =>
            <li className={styles.item} key={uuidv4()}>
              <IngredientImage ingredientUrl={ingredient.image_mobile} ingredientName={ingredient.name} />
              <p className='text text_type_main-default'>{ingredient.name}</p>
              <p className={styles.price}>1 x {ingredient.price}&nbsp;<CurrencyIcon /></p>
            </li>
          )
        }
      </ul>
      <footer className={styles.footer}>
        <time className={styles.time}>{date}</time>
        <p className={styles.price}>{price}&nbsp; <CurrencyIcon /></p>
      </footer>
    </div>
  );
};

export default FeedOrderDetails;