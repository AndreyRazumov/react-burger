import PropTypes from 'prop-types';
import { ingredientDataTypes } from '../../utils/types';
import burgerIngredientsStyle from './burgerIngredients.module.css'
import TabElement from './tabElement/tabElement.jsx'
import ListIngredients from './ingredientList/ingredientList'

const BurgerIngredients = ({data, openDetailsModal}) => {
    const bun = data.filter((item) => item.type === 'bun');
    const sauce = data.filter((item) => item.type === 'sauce');
    const main = data.filter((item) => item.type === 'main');

    return (
        <section className={`${burgerIngredientsStyle.section}`}>
            <h1 className={`text text_type_main-large pb-5`}>Соберите бургер</h1>
            <nav>
                <TabElement />
            </nav>
            <ul className={`${burgerIngredientsStyle.lists} mt-10`}>
                <ListIngredients name={"Булки"} data={bun} openDetailsModal={openDetailsModal} />
                <ListIngredients name={"Соусы"} data={sauce} openDetailsModal={openDetailsModal} />
                <ListIngredients name={"Начинки"} data={main} openDetailsModal={openDetailsModal} />
            </ul>
        </section>
    );

}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientDataTypes).isRequired,
    openDetailsModal: PropTypes.func.isRequired
};
export default BurgerIngredients