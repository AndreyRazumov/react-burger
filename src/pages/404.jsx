import React from 'react';
import styles from './404.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>404</p>
      <p className={styles.text}>Такой страницы не существует</p>
    </div>
  );
}