import { useSelector } from 'react-redux';
import IngredientProperty from './ingredientProperty/ingredientProperty';
import ingredientDetailsStyles from './ingredientDetails.module.css';

const IngredientDetails = () => {
  const ingredient = useSelector((store) => store.ingredientReducer.ingredient);

  return (
    <div className={ingredientDetailsStyles.container}>
      <img src={ingredient.image_large} className={`${ingredientDetailsStyles.image}`} alt={ingredient.name} />
      <p className={`${ingredientDetailsStyles.name} text text_type_main-medium mt-7 mb-4`}>{ingredient.name}</p>
      <ul className={`${ingredientDetailsStyles.list}`}>
        <IngredientProperty property={'Калории, ккал'} value={ingredient.calories} />
        <IngredientProperty property={'Белки, г'} value={ingredient.proteins} />
        <IngredientProperty property={'Жиры, г'} value={ingredient.fat} />
        <IngredientProperty property={'Углеводы, г'} value={ingredient.carbohydrates} />
      </ul>
    </div>
  );
};



export default IngredientDetails;