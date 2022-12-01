import { useState, useEffect, FC } from 'react';
import { useSelector } from '../../services/hooks';
import { useInView } from 'react-intersection-observer';
import style from './burgerIngredients.module.css'
import TabElement from './tabElement/tabElement'
import Preloader from "../preloader/preloader";
import ListIngredients from './ingredientList/ingredientList'
import { selectItemsOfType } from "../../utils/utils";
import { ItemType } from "../../utils/const";


const BurgerIngredients: FC = () => {
    const { ingredients, ingredientsRequest } = useSelector(store => store.ingredientsReducer);
    const buns = selectItemsOfType(ItemType.Bun.TYPE, ingredients);
    const sauces = selectItemsOfType(ItemType.Sauce.TYPE, ingredients);
    const mains = selectItemsOfType(ItemType.Main.TYPE, ingredients);
    const tabs = [ItemType.Bun, ItemType.Sauce, ItemType.Main];

    const [current, setCurrent] = useState(ItemType.Bun.TYPE);


    const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
    const [saucesRef, inViewSauces] = useInView({ threshold: 0 });
    const [mainsRef, inViewMains] = useInView({ threshold: 0.5 });

    useEffect(() => {
        if (inViewBuns) {
            setCurrent(ItemType.Bun.TYPE);
        } else if (inViewMains) {
            setCurrent(ItemType.Main.TYPE);
        } else if (inViewSauces) {
            setCurrent(ItemType.Sauce.TYPE);
        }
    }, [inViewBuns, inViewSauces, inViewMains]);

    const onTabClick = (tab: string) => {
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
                <TabElement tabs={tabs} current={current} onTabClick={onTabClick} />
            </nav>
            {ingredientsRequest === "pending" && <Preloader />}
            {ingredientsRequest === "success" && (
                <ul className={`${style.lists} mt-10`}>
                    <ListIngredients categoryRef={bunsRef} idTag={ItemType.Bun.TYPE} itemList={buns} itemType={ItemType.Bun} />
                    <ListIngredients categoryRef={saucesRef} idTag={ItemType.Sauce.TYPE} itemList={sauces} itemType={ItemType.Sauce} />
                    <ListIngredients categoryRef={mainsRef} idTag={ItemType.Main.TYPE} itemList={mains} itemType={ItemType.Main} />
                </ul>)}
        </section>
    );

}

export default BurgerIngredients