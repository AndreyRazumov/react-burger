import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import IngredientProperty from './ingredientProperty/ingredientProperty';
import styles from './ingredientDetails.module.css';

const IngredientDetails = () => {
  const { id } = useParams();
  const ingredients = useSelector(store => store.ingredientsReducer.ingredients);
  const ingredient = id ? ingredients.find((item => item._id === id)) : {};

  if (ingredients.length !== 0) {
    return (
      <div className={styles.container}>
        <img src={ingredient.image_large} className={`${styles.image}`} alt={ingredient.name} />
        <p className={`${styles.name} text text_type_main-medium mt-7 mb-4`}>{ingredient.name}</p>
        <ul className={`${styles.list}`}>
          <IngredientProperty property={'Калории, ккал'} value={ingredient.calories} />
          <IngredientProperty property={'Белки, г'} value={ingredient.proteins} />
          <IngredientProperty property={'Жиры, г'} value={ingredient.fat} />
          <IngredientProperty property={'Углеводы, г'} value={ingredient.carbohydrates} />
        </ul>
      </div>
    );
  };
}

export default IngredientDetails;