import PropTypes from 'prop-types';
import { ingredientDataTypes } from '../../../utils/types';
import styles from './ingredientList.module.css'
import Ingredient from '../ingredient/ingredient'


const ListIngredients = ({ data, name, openDetailsModal }) => {
    return (
        <li>
            <h2 className={`text text_type_main-medium`}>{name}</h2>
            <ul className={`${styles.lists} mt-6 mb-8`}>
                {data.map((item) => (
                    <Ingredient
                        element={item}
                        key={item._id}
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