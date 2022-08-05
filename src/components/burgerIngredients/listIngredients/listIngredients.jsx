import listIngredients from './listIngredients.module.css'
import Ingredient from '../ingredient/ingredient'


const ListIngredients = ({ data, name }) => {
    return (        
        <li id="" className={`${listIngredients.itemIngredients}`}>
            <h2 className={`${listIngredients.designation} pr-4 pl-4`}>{name}</h2>
            <ul className={`${listIngredients.list} pr-4 pl-4`}>
                {data.map((item) => (
                    <Ingredient src={item.image} name={item.name} price={item.price}/>
                    
                ))}
            </ul>
        </li>
    )
}


export default ListIngredients