import React from 'react';
import PropTypes from 'prop-types';
import { ingridientDataTypes } from '../../../utils/types';
import ingredientList from './ingredientList.module.css'
import Ingredient from '../ingredient/ingredient'


const ListIngredients = ({ data, name, clickElements }) => {
    return (        
        <li>
        <h2 className={`text text_type_main-medium`}>{name}</h2>
                <ul className={`${ingredientList.lists} mt-6 mb-8`}>
                    {data.map((item) => (
                        <Ingredient 
                        item={item} 
                        key={item._id}
                        count={item.__v}
                        clickElements={clickElements}
                        />
                    ))}
                </ul>
        </li>
    )
}

ListIngredients.propTypes = {
    data: PropTypes.arrayOf(ingridientDataTypes).isRequired,
    name: PropTypes.string.isRequired,
};

export default ListIngredients