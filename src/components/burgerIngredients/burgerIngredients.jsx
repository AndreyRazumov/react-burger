import React from 'react';
import PropTypes from 'prop-types';
import { ingridientDataTypes } from '../../utils/types';
import burgerIngredientsStyle from './burgerIngredients.module.css'
import TabElement from './tabElement/tabElement.jsx'
import ListIngredients from './ingredientList/ingredientList'

const BurgerIngredients = (props, clickElements) => {
    const bun = props.data.filter(item => item.type === 'bun');
    const sauce = props.data.filter(item => item.type === 'sauce');
    const main = props.data.filter(item => item.type === 'main');

    return (
        <section className={`${burgerIngredientsStyle.section}`}>
            <h1 className={`text text_type_main-large pb-5`}>Соберите бургер</h1>            
            <nav>
                <TabElement />
            </nav>
            <ul className={`${burgerIngredientsStyle.lists} mt-10`}>
                <ListIngredients name={"Булки"} data={bun} clickElements={clickElements} />
                <ListIngredients name={"Соусы"} data={sauce} clickElements={clickElements} />
                <ListIngredients name={"Начинки"} data={main} clickElements={clickElements} />
            </ul>
        </section>
    )

}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingridientDataTypes).isRequired,
};

export default BurgerIngredients