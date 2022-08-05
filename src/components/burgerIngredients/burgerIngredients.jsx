import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredients from './burgerIngredients.module.css'

const TabElement = () => { 
    const [current, setCurrent] = React.useState('one')
    return (
        <div style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
            One
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
            Two
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
            Three
        </Tab>
        </div>
    )
    }

export default class BurgerIngredients extends React.Component {
    render() {
        return (
            <section className={burgerIngredients.section}>
                <nav className={`${burgerIngredients.navigation} pt-4 pb-4`}>
                    <TabElement />
                </nav>
                <ul>
                    <li>
                        
                    </li>
                </ul>




                {/* <nav className={`${burgerIngredients.navigation} pt-4 pb-4`}>
                <li className='pt-4 pr-5 pb-4 pl-5'>
                    <a href='https://' className={`${burgerIngredients.linkActive} text text_type_main-default`}>
                    <BurgerIcon type="primary" />
                    <span className='ml-2'>Конструктор</span>
                    </a>
                </li>
                <li className='pt-4 pr-5 pb-4 pl-5 ml-2'>
                    <a href='https://' className={`${burgerIngredients.link} text text_type_main-default`}>
                    <ListIcon type="secondary" />
                    <span className='ml-2'>Лента Заказов</span>
                    </a>
                </li>
                </nav>
                <div className={burgerIngredients.logo}>
                    <Logo />
                </div>                
                <nav className={burgerIngredients.navigation}>
                    <li className='pt-4 pr-5 pb-4 pl-5'>
                        <a href='https://' className={`${burgerIngredients.link} text text_type_main-default`}>
                        <ProfileIcon type="secondary" />
                        <span className='ml-2'>Личный кабинет</span>
                        </a>
                    </li>
                </nav> */}
            </section>
        )
    }
}

