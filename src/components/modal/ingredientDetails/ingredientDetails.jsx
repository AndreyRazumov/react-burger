import IngredientProperty from './ingredientProperty/ingredientProperty';
import { ingredientDataTypes } from '../../../utils/types';
import ingredientDetailsStyles from './ingredientDetails.module.css';

const IngredientDetails = ({ currentItem }) => {
  return(
    <div className={ingredientDetailsStyles.container}>
      <img src={currentItem.image_large} className={`${ingredientDetailsStyles.image}`} alt={currentItem.name} />
      <p className={`${ingredientDetailsStyles.name} text text_type_main-medium mt-7 mb-4`}>{currentItem.name}</p>
      <ul className={`${ingredientDetailsStyles.list}`}>
        <IngredientProperty property={'Калории, ккал'} value={currentItem.calories} />
        <IngredientProperty property={'Белки, г'} value={currentItem.proteins} />
        <IngredientProperty property={'Жиры, г'} value={currentItem.fat} />
        <IngredientProperty property={'Углеводы, г'} value={currentItem.carbohydrates} />
      </ul>
    </div>
  );
};

IngredientDetails.propTypes = {
  currentItem: ingredientDataTypes.isRequired
}

export default IngredientDetails;