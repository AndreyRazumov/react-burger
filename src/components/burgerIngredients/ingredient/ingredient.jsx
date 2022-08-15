import PropTypes from 'prop-types';
import { ingredientDataTypes } from '../../../utils/types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyle from './ingredient.module.css'


const Ingredient =  ({ item, count, openDetailsModal }) => {
    const { image, name, price } = item;
    return (
        <li onClick={openDetailsModal} className={`${ingredientStyle.list} ml-4 mr-2 mb-8`}>
            {0 < count &&
                <Counter count={count} size="default" />
            }
            <img src={image} alt={name} className={`ml-4 mr-4`} />
            <div className={`${ingredientStyle.price} mt-2 mb-2`}>
                <p className={`mr-2 text text_type_digits-default`}>{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${ingredientStyle.name} text text_type_main-default`}>{name}</p>
        </li>
    )
}

Ingredient.propTypes = {
    item: ingredientDataTypes.isRequired,
    count: PropTypes.number.isRequired,
    openDetailsModal: PropTypes.func.isRequired,
};

export default Ingredient