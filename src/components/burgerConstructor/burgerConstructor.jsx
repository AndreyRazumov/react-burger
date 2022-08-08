import React from 'react';
import PropTypes from 'prop-types';
import { ingridientDataTypes } from '../../utils/const';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorElements from './constructorElements/constructorElements'
import burgerConstructorStyles from './burgerConstructor.module.css';


const BurgerConstructor = ({ ingredients }) => {
    const bean = ingredients[0];
    const main = ingredients.slice(1);
    const price = main.reduce((sum,  current) => sum + current.price, bean.price);
    return (
        <section className={`${burgerConstructorStyles.section} pt-15 pl-4`}>
            <ConstructorElements ingredients={ingredients} />
            <div className={`${burgerConstructorStyles.submit} pt-10 pr-4`}>
                <div className={`${burgerConstructorStyles.price} mr-10`}>
                    <p className={`text text_type_digits-medium pr-1`}>{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingridientDataTypes).isRequired,
};

export default BurgerConstructor