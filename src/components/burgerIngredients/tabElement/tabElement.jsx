import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import tabElementStyle from './tabElement.module.css'

const TabElement = () => { 
    const [current, setCurrent] = React.useState('bun')
    return (
        <nav className={`${tabElementStyle.main}`}>
            <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                Начинки
            </Tab>
        </nav>
    )
}

export default TabElement
