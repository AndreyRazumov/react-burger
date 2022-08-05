import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

const TabElement = () => { 
    const [current, setCurrent] = React.useState('bun')
    const handleClick = (evt) => {
      setCurrent(evt);
    };
    return (
        <div style={{ display: 'flex' }}>
            <Tab value="bun" active={current === 'bun'} onClick={handleClick}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={handleClick}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={handleClick}>
                Начинки
            </Tab>
        </div>
    )
}

export default TabElement
