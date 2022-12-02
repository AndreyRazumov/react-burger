import { useEffect, FC } from 'react';
import { useDispatch, useSelector } from '../services/hooks'
import ProfileMenu from "../components/profile/profileMenu/profileMenu";
import ProfileOrders from '../components/profile/profileOrders/profileOrders';
import { WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_START } from '../services/constants';
import { getWsFeedConnected } from '../services/selectors';
import { getCookie } from '../utils/utils';
import styles from './page.module.css'

const ProfileOrdersPage: FC = () => {
  const dispatch = useDispatch();
  const isConnected = useSelector(getWsFeedConnected);

  useEffect(() => {
    dispatch({
      type: WS_FEED_CONNECTION_START,
      payload: `?token=${getCookie('token')}`
    });

    return () => {
      dispatch({
        type: WS_FEED_CONNECTION_CLOSED,
      });
    }
  }, [dispatch]);


  return (
    <div className='page'>
      <main className={styles.main}>
        <ProfileMenu />
        {
          isConnected && <ProfileOrders />
        }
      </main>
    </div>
  );
};

export default ProfileOrdersPage