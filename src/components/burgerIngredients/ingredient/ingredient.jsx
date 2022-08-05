import ingredientStyle from './ingredient.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const Ingredient = ({ src, name, price }) => {
    return (
        <li className={`${ingredientStyle.itemIngredients} mt-6 mb-8`}>
            <img src={src} alt="ingridienImage" className={`mb-1`} />
            <p className={`${ingredientStyle.itemIngredients} mr-2 text text_type_digits-default`}>{price}</p>
            <CurrencyIcon type="primary" />
            <p className={`${ingredientStyle.name} text text_type_main-default`}>{name}</p>
            <div>
                <Counter count={1} size="default" />
            </div>
        </li>
    )
}

export default Ingredient