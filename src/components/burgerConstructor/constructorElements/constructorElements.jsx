import React from 'react';
import PropTypes from 'prop-types';
import { ingridientDataTypes } from '../../../utils/types';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import constructorElementsStyle from './constructorElements.module.css'

const ConstructorElements = ({ ingredients }) => {
    return (
        <div>
            {0 < ingredients.length &&
            <div className={`ml-8`} key="top">
                <ConstructorElement
                    type="top"
                    isLocked
                    text={`${ingredients[0].name} (верх)`}
                    price={ingredients[0].price}
                    thumbnail={ingredients[0].image_mobile}
                />
            </div>
            }
            <ul className={`${constructorElementsStyle.items}`} key="middle">
                {ingredients.slice(1).map(ingredient => (
                    <li className={`${constructorElementsStyle.list} mr-2 mb-4`} key={ingredient._id}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={ingredient.name}
                            price={ingredient.price}
                            thumbnail={ingredient.image_mobile}
                        />
                    </li>
                ))}
            </ul>
            {0 < ingredients.length &&
            <div className={`ml-8 mt-2`} key="bottom">
                <ConstructorElement
                    type="bottom"
                    isLocked
                    text={`${ingredients[0].name} (низ)`}
                    price={ingredients[0].price}
                    thumbnail={ingredients[0].image_mobile}
                />
            </div>
            }
        </div>
    )
}

ConstructorElements.propTypes = {
    ingredients: PropTypes.arrayOf(ingridientDataTypes).isRequired,
};

export default ConstructorElements