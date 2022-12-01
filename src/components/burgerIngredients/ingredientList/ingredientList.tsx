import { forwardRef, FC } from 'react';
import styles from './ingredientList.module.css'
import Ingredient from '../ingredient/ingredient'
import { IIngredient } from "../../../utils/types";

interface IListIngredients {
    itemList: IIngredient[];
    itemType: {
        NAME: string;
        TYPE: string;
    };
    idTag: string;
    categoryRef: any;
}

const ListIngredients: FC<IListIngredients> = ({ idTag, itemList, itemType, categoryRef }) => {
    return (
        <li>
            <h2 id={idTag} className={`text text_type_main-medium`}>{itemType.NAME}</h2>
            <ul className={`${styles.lists} mt-6 mb-8`} ref={categoryRef}>
                {itemList.map((item) => (

                    <Ingredient
                        ingredient={item}
                        key={item._id}
                    />

                ))}
            </ul>
        </li>
    )
}
export default ListIngredients