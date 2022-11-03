import styles from './page.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>404</h1>
      <p className={styles.text}>Такой страницы не существует</p>
    </div>
  );
}