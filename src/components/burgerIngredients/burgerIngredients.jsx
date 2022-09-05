import React from 'react';
import burgerIngredientsStyle from './burgerIngredients.module.css'
import TabElement from './tabElement/tabElement.jsx'
import ListIngredients from './ingredientList/ingredientList'
import { IngredientsContext } from '../../utils/ingredientsContext'; 

const BurgerIngredients = () => {
    const ingredients = React.useContext(IngredientsContext);
    const bun = ingredients.filter((item) => item.type === 'bun');
    const sauce = ingredients.filter((item) => item.type === 'sauce');
    const main = ingredients.filter((item) => item.type === 'main');

    return (
        <section className={`${burgerIngredientsStyle.section}`}>
            <h1 className={`text text_type_main-large pb-5`}>Соберите бургер</h1>
            <nav>
                <TabElement />
            </nav>
            <ul className={`${burgerIngredientsStyle.lists} mt-10`}>
                <ListIngredients name={"Булки"} data={bun} />
                <ListIngredients name={"Соусы"} data={sauce} />
                <ListIngredients name={"Начинки"} data={main} />
            </ul>
        </section>
    );

}


export default BurgerIngredients