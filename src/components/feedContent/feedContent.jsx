import FeedList from './feedList/feedList';
import styles from './feedContent.module.css';
import FeedInfo from './feedInfo/feedInfo';

const FeedContent = () => {
  return (
    <div className={styles.content}>
      <h1 className={`${styles.title} pt-10`}>Лента заказов</h1>
      <FeedList />
      <FeedInfo />
    </div>
  );
};

export default FeedContent;