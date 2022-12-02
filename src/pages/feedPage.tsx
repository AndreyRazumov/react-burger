import { useEffect, FC } from 'react';
import { useDispatch } from '../services/hooks';
import FeedContent from "../components/feedContent/feedContent";
import { WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_START } from '../services/constants';

const FeedPage: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: WS_FEED_CONNECTION_START,
      payload: '/all'
    });
    console.log('socket was opened')

    return () => {
      console.log('socket was close')
      dispatch({ type: WS_FEED_CONNECTION_CLOSED });
    }
  },
    [dispatch]);

  return (
    <main>
      <FeedContent />
    </main>
  );
};

export default FeedPage