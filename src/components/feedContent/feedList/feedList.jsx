import { useSelector } from 'react-redux';
import { getOrders, getWsFeedConnected } from '../../../services/selectors';
import OrderCard from '../../orderCard/orderCard';
import styles from './feedList.module.css';
import Preloader from '../../preloader/preloader';

const FeedList = () => {
  const orders = useSelector(getOrders);
  const isConnected = useSelector(getWsFeedConnected);

  return (
    <ul className={styles.list}>
      {
        orders.map(order =>
          <OrderCard
            key={order._id}
            id={order._id}
            ingredientIdList={order.ingredients}
            name={order.name}
            number={order.number}
            created={order.createdAt}
          />
        )
      }
      {
        !isConnected && <Preloader />
      }
    </ul>
  );
}

export default FeedList;
