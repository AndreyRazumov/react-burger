import ingredientList from './ingredientList.module.css'
import Ingredient from '../ingredient/ingredient'


const ListIngredients = ({ data, name }) => {
    return (        
        <li className={`${ingredientList.blocks}`}>
        <h2 className={`${ingredientList.designation} text text_type_main-medium`}>{name}</h2>
                <ul className={`${ingredientList.lists} mt-6 mb-8`}>
                    {data.map((item) => (
                        <Ingredient image={item.image} name={item.name} price={item.price}/>
                        
                    ))}
                </ul>
        </li>
    )
}


export default ListIngredients