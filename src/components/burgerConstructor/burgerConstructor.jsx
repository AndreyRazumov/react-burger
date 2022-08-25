import PropTypes from 'prop-types';
import { ingredientDataTypes } from '../../utils/types';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorElements from './constructorElements/constructorElements'
import burgerConstructorStyles from './burgerConstructor.module.css';


const BurgerConstructor = ({ ingredients, openOrderModal }) => {
    const price = ingredients.reduce((sum,  ingredient) => sum + ingredient.price, 0);
    return (
        <section className={`${burgerConstructorStyles.section} pt-15 pl-4`}>
            <ConstructorElements ingredients={ingredients} />
            <div className={`${burgerConstructorStyles.submit} pt-10 pr-4`}>
                <div className={`${burgerConstructorStyles.price} mr-10`}>
                    <p className={`text text_type_digits-medium pr-1`}>{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={openOrderModal}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientDataTypes).isRequired,
    openOrderModal: PropTypes.func.isRequired
};

export default BurgerConstructor