import { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import style from './burgerIngredients.module.css'
import TabElement from './tabElement/tabElement.jsx'
import ListIngredients from './ingredientList/ingredientList'

const BurgerIngredients = ({ openDetailsModal }) => {
    const ingredients = useSelector((store) => store.ingredientsReducer.ingredients);
    const buns = useMemo(() => ingredients.filter(item => item.type === 'bun'), [ingredients]);
    const sauces = useMemo(() => ingredients.filter(item => item.type === 'sauce'), [ingredients]);
    const mains = useMemo(() => ingredients.filter(item => item.type === 'main'), [ingredients]);

    const [current, setCurrent] = useState('bun')


    const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
    const [saucesRef, inViewSauces] = useInView({ threshold: 0 });
    const [mainsRef, inViewMains] = useInView({ threshold: 0 });

    useEffect(() => {
        if (inViewBuns) {
            setCurrent('bun');
        } else if (inViewMains) {
            setCurrent('main');
        } else if (inViewSauces) {
            setCurrent('sauce');
        }
    }, [inViewBuns, inViewSauces, inViewMains]);

    const onTabClick = (tab) => {
        setCurrent(tab);
        const element = document.getElementById(tab);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }


    return (
        <section className={style.section}>
            <h1 className={`text text_type_main-large pb-5`}>Соберите бургер</h1>
            <nav>
                <TabElement current={current} onTabClick={onTabClick} />
            </nav>
            <ul className={`${style.lists} mt-10`}>
                <ListIngredients ref={bunsRef} type="bun" name={"Булки"} data={buns} openDetailsModal={openDetailsModal} />
                <ListIngredients ref={saucesRef} type="sauce" name={"Соусы"} data={sauces} openDetailsModal={openDetailsModal} />
                <ListIngredients ref={mainsRef} type="main" name={"Начинки"} data={mains} openDetailsModal={openDetailsModal} />
            </ul>
        </section>
    );

}

BurgerIngredients.propTypes = {
    openDetailsModal: PropTypes.func.isRequired
};

export default BurgerIngredients