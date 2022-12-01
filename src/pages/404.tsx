import styles from './page.module.css';
import { FC } from "react";

const NotFoundPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>404</h1>
      <p className={styles.text}>Такой страницы не существует</p>
    </div>
  );
}

export default NotFoundPage