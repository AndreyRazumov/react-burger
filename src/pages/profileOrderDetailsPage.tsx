import { useEffect, FC } from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import FeedOrderDetails from "../components/feedContent/feedOrderDetails/feedOrderDetails";
import { WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_START } from '../services/constants';
import { getOrders, getWsFeedConnected } from '../services/selectors/index';
import { getCookie } from '../utils/utils';
import styles from './page.module.css';

const ProfileOrderDetailsPage: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getOrders);
  const isConnected = useSelector(getWsFeedConnected);

  useEffect(() => {
    dispatch({
      type: WS_FEED_CONNECTION_START,
      payload: `?token=${getCookie('token')}`
    });

    return () => {
      dispatch({ type: WS_FEED_CONNECTION_CLOSED });
    }
  },
    [dispatch]);

  return (
    <main>
      {
        isConnected && !!orders.length && <div className={styles.container}>
          <FeedOrderDetails />
        </div>
      }
    </main>
  );
};

export default ProfileOrderDetailsPage