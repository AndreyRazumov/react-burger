import ingredientStyle from './ingredient.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const Ingredient = ({ image, name, price }) => {
    return (
        <li className={`${ingredientStyle.ingredient} ml-4 mr-2 mb-8`}>
            <Counter count={1} size="default" />
            <img src={image} alt={name} className={`ml-4 mr-4`} />
            <div className={`${ingredientStyle.price} mt-2 mb-2`}>
                <p className={`mr-2 text text_type_digits-default`}>{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${ingredientStyle.name} text text_type_main-default`}>{name}</p>
        </li>
    )
}

export default Ingredient