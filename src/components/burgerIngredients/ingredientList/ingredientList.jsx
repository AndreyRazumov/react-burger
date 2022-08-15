import PropTypes from 'prop-types';
import { ingredientDataTypes } from '../../../utils/types';
import ingredientList from './ingredientList.module.css'
import Ingredient from '../ingredient/ingredient'


const ListIngredients = ({ data, name, openDetailsModal }) => {
    return (
        <li>
        <h2 className={`text text_type_main-medium`}>{name}</h2>
            <ul className={`${ingredientList.lists} mt-6 mb-8`}>
                {data.map((item) => (
                    <Ingredient 
                    item={item} 
                    key={item._id}
                    count={item.__v}
                    openDetailsModal={() => openDetailsModal(item)}
                    />
                ))}
            </ul>
        </li>
    )
}

ListIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientDataTypes).isRequired,
    name: PropTypes.string.isRequired,
    openDetailsModal: PropTypes.func.isRequired
};

export default ListIngredients