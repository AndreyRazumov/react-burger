import React from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import constructorElementsStyle from './constructorElements.module.css'
import { IngredientsContext } from '../../../utils/ingredientsContext'; 

const ConstructorElements = () => {
    const ingredients = React.useContext(IngredientsContext);
    const selectedBun = ingredients.find((item) => item.type === 'bun');

    return (
        <div>
            {0 < ingredients.length &&
            <div className={`ml-8`} key="top">
                <ConstructorElement
                    type="top"
                    isLocked
                    text={`${selectedBun.name} (верх)`}
                    price={selectedBun.price}
                    thumbnail={selectedBun.image_mobile}
                />
            </div>
            }
            <ul className={`${constructorElementsStyle.items}`} key="middle">
                {ingredients.map((ingredient) => {
                    if (ingredient.type !== "bun") {
                    return (
                        <li className={`${constructorElementsStyle.list} mr-2 mb-4`} key={ingredient._id}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={ingredient.name}
                            price={ingredient.price}
                            thumbnail={ingredient.image_mobile}
                        />
                    </li>
                    )}}
                )}
            </ul>
            {0 < ingredients.length &&
            <div className={`ml-8 mt-2`} key="bottom">
                <ConstructorElement
                    type="bottom"
                    isLocked
                    text={`${selectedBun.name} (низ)`}
                    price={selectedBun.price}
                    thumbnail={selectedBun.image_mobile}
                />
            </div>
            }
        </div>
    )
};


export default ConstructorElements