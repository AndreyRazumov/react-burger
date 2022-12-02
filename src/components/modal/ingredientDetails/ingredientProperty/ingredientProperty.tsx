import { FC } from "react";
import styles from './ingredientProperty.module.css';

const IngredientProperty: FC<{ property: string; value: string }> = ({ property, value }) => {
  return (
    <li className={styles.item}>
      <p className='text text_type_main-default mb-2'>{property}</p>
      <p className='text text_type_digits-default'>{value}</p>
    </li>
  );
};

export default IngredientProperty;