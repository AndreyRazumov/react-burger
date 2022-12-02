import { useSelector } from '../../../services/hooks';
import { useParams } from 'react-router-dom';
import IngredientProperty from './ingredientProperty/ingredientProperty';
import styles from './ingredientDetails.module.css';
import { FC } from "react";


const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(store => store.ingredientsReducer.ingredients);
  const ingredient = id ? ingredients.find((item => item._id === id)) : undefined;

  if (!!ingredient && ingredients.length !== 0) {
    return (
      <div className={styles.container}>
        <img src={ingredient.image_large} className={styles.image} alt={ingredient.name} />
        <p className={styles.name}>{ingredient.name}</p>
        <ul className={styles.list}>
          <IngredientProperty property={'Калории, ккал'} value={ingredient.calories.toString()} />
          <IngredientProperty property={'Белки, г'} value={ingredient.proteins.toString()} />
          <IngredientProperty property={'Жиры, г'} value={ingredient.fat.toString()} />
          <IngredientProperty property={'Углеводы, г'} value={ingredient.carbohydrates.toString()} />
        </ul>
      </div>
    );
  } else {
    return <></>;
  }
}

export default IngredientDetails;