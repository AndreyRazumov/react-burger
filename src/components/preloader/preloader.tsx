import { FC } from "react";
import styles from './preloader.module.css';

const Preloader: FC = () => {
  return (
    <div className={styles.loader}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default Preloader;