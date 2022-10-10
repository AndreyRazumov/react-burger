import IngredientDetails from "../components/modal/ingredientDetails/ingredientDetails";
import styles from './page.module.css';

const IngredientPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={`${styles.title} pt-15`}>Детали ингредиента</h1>
      <IngredientDetails />
    </div>
  );
};
export default IngredientPage
