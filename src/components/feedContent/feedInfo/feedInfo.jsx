import { useSelector } from 'react-redux';
import { getTotal, getTotalToday, getOrders } from '../../../services/selectors';
import FeedCompletedCount from "../feedCompletedCount/feedCompletedCount";
import FeedStatusList from "../feedStatusList/feedStatusList";
import styles from './feedInfo.module.css';

const FeedInfo = () => {
  const orders = useSelector(getOrders);
  const total = useSelector(getTotal);
  const totalToday = useSelector(getTotalToday);

  const completedOrders = orders.length ? orders.filter(order => order.status === 'done') : [];
  const pendingOrders = orders.length ? orders.filter(order => order.status === 'pending') : [];

  return (
    <section className={styles.container}>
      <FeedStatusList type='completed' list={completedOrders} />
      <FeedStatusList type='process' list={pendingOrders} />
      <FeedCompletedCount type='onTotal' count={total} />
      <FeedCompletedCount type='onToday' count={totalToday} />
    </section>
  );
};

export default FeedInfo;
