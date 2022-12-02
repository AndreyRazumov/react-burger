import IngredientDetails from "../components/modal/ingredientDetails/ingredientDetails";
import styles from './page.module.css';
import { FC } from "react";

const IngredientPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={`${styles.title} pt-15`}>Детали ингредиента</h1>
      <IngredientDetails />
    </div>
  );
};
export default IngredientPage
