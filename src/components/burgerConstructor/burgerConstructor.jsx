import React from 'react';
import PropTypes from 'prop-types';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorElements from './constructorElements/constructorElements'
import burgerConstructorStyles from './burgerConstructor.module.css';
import { IngredientsContext } from '../../utils/ingredientsContext'; 

const BurgerConstructor = ({ openOrderModal }) => {
    const ingredients = React.useContext(IngredientsContext);
    
    const price = React.useMemo(() => 
        ingredients.reduce((sum,  ingredient) => sum + ingredient.price, 0),
        [ingredients]
    );
 
    const handleOrder = () => {
        const orderData = ingredients.map((item) => item._id);
        openOrderModal(orderData);
    };

    return (
        <section className={`${burgerConstructorStyles.section} pt-15 pl-4`}>
            <ConstructorElements />
            <div className={`${burgerConstructorStyles.submit} pt-10 pr-4`}>
                <div className={`${burgerConstructorStyles.price} mr-10`}>
                    <p className={`text text_type_digits-medium pr-1`}>{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={handleOrder}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    openOrderModal: PropTypes.func.isRequired
};

export default BurgerConstructor