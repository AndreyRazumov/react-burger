import styles from './ingredientImage.module.css';
import { FC } from "react";


interface IIngredientImage {
  ingredientUrl: string;
  ingredientName: string;
  unshowedIngredientsCount: number;
  isCountShow: boolean;
}

const IngredientImage: FC<IIngredientImage> = ({
  ingredientUrl,
  ingredientName,
  unshowedIngredientsCount,
  isCountShow,
}) => {
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={ingredientUrl}
        alt={ingredientName}
      />
      {
        isCountShow && !!unshowedIngredientsCount &&
        <p className={styles.counter}>
          +{unshowedIngredientsCount}
        </p>
      }
    </div>
  );
};

export default IngredientImage;
