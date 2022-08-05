import burgerIngredients from './burgerIngredients.module.css'
import TabElement from './tab/tab.jsx'
import ListIngredients from './listIngredients/listIngredients'

const BurgerIngredients = (props) => {
    const bun = props.data.filter(item => item.type === 'bun');
    const sauce = props.data.filter(item => item.type === 'sauce');
    const main = props.data.filter(item => item.type === 'main');
    
    return (
        <section className={burgerIngredients.burgerIngredients}>
            <h1 className={`${burgerIngredients.headline} text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>            
            <nav className={`${burgerIngredients.navigation} pt-4 pb-4`}>
                <TabElement />
            </nav>
            <ul className={`${burgerIngredients.lists} mt-10 custom-scroll`}>
                <ListIngredients name={"Булки"} data={bun} />
                <ListIngredients name={"Соусы"} data={sauce} />
                <ListIngredients name={"Начинки"} data={main} />
            </ul>
        </section>
    )

}

export default BurgerIngredients