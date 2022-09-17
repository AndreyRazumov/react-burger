import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import burgerIngredientsStyle from './burgerIngredients.module.css'
import TabElement from './tabElement/tabElement.jsx'
import ListIngredients from './ingredientList/ingredientList'

const BurgerIngredients = ({ openDetailsModal }) => {
    const ingredients = useSelector((store) => store.ingredientsReducer.ingredients);
    const buns = useMemo(() => ingredients.filter(item => item.type === 'bun'), [ingredients]);
    const sauces = useMemo(() => ingredients.filter(item => item.type === 'sauce'), [ingredients]);
    const mains = useMemo(() => ingredients.filter(item => item.type === 'main'), [ingredients]);

    const [current, setCurrent] = useState('bun')
    const handleTabClick = (e) => {
        setCurrent(e);
    }

    const scrollHandler = (evt) => {
        const scroll = evt.target.scrollTop;
        scroll <= 300
            ? setCurrent("bun")
            : scroll <= 830
                ? setCurrent("sauce")
                : setCurrent("main");
    };


    return (
        <section className={`${burgerIngredientsStyle.section}`}>
            <h1 className={`text text_type_main-large pb-5`}>Соберите бургер</h1>
            <nav>
                <TabElement current={current} handleTabClick={handleTabClick} />
            </nav>
            <ul onScroll={scrollHandler} className={`${burgerIngredientsStyle.lists} mt-10`}>
                <ListIngredients type="bun" name={"Булки"} data={buns} openDetailsModal={openDetailsModal} />
                <ListIngredients type="sauce" name={"Соусы"} data={sauces} openDetailsModal={openDetailsModal} />
                <ListIngredients type="main" name={"Начинки"} data={mains} openDetailsModal={openDetailsModal} />
            </ul>
        </section>
    );

}

BurgerIngredients.propTypes = {
    openDetailsModal: PropTypes.func.isRequired
};

export default BurgerIngredients