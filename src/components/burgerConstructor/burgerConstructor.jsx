// import PropTypes from 'prop-types';
// import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorElements from './constructorElements/constructorElements'
// import { ingredientType } from '../../utils/types';
// import burgerConstructorStyles from './burgerConstructor.module.css';


const BurgerConstructor = () => {
    return (
        <section className={`$burgerConstructorStyles.section} pt-15 pr-4 pl-4`}>
            <div className={`$burgerConstructorStyles.wrapper}`}>
                <ConstructorElements/>
                <div className={`$burgerConstructorStyles.filling}`}>
                    <ConstructorElements/>
                </div>
                <ConstructorElements/>
            </div>
        </section>
    )
}

export default BurgerConstructor