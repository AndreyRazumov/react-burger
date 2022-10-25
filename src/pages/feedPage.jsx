import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FeedContent from "../components/feedContent/feedContent";
import { WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_START } from '../services/actions/feed';

const FeedPage = () => {
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