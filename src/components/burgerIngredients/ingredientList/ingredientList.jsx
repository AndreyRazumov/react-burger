import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { ingredientDataTypes } from '../../../utils/types';
import styles from './ingredientList.module.css'
import Ingredient from '../ingredient/ingredient'


const ListIngredients = forwardRef(({ data, name, openDetailsModal }, ref) => {
    return (
        <li>
            <h2 className={`text text_type_main-medium`}>{name}</h2>
            <ul className={`${styles.lists} mt-6 mb-8`} ref={ref}>
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
})

ListIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientDataTypes).isRequired,
    name: PropTypes.string.isRequired,
    openDetailsModal: PropTypes.func.isRequired,
};

export default ListIngredients