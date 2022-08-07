import burgerIngredients from './burgerIngredients.module.css'
import TabElement from './tab/tab.jsx'
import ListIngredients from './ingredientList/ingredientList'
// import { ItemType, ingridientDataTypes, itemDataTypes } from '../../utils/const'

const BurgerIngredients = (props) => {
    const bun = props.data.filter(item => item.type === 'bun');
    const sauce = props.data.filter(item => item.type === 'sauce');
    const main = props.data.filter(item => item.type === 'main');
    
    return (
        <section className={`${burgerIngredients.section}`}>
            <h1 className={`${burgerIngredients.headline} text text_type_main-large pb-5`}>Соберите бургер</h1>            
            <nav className={`${burgerIngredients.navigation}`}>
                <TabElement />
            </nav>
            <ul className={`${burgerIngredients.lists} mt-10`}> 
                <ListIngredients name={"Булки"} data={bun} />
                <ListIngredients name={"Соусы"} data={sauce} />
                <ListIngredients name={"Начинки"} data={main} />
            </ul>
        </section>
    )

}
// custom-scroll
export default BurgerIngredients