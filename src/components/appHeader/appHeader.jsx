import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import headerStyles from './appHeader.module.css'

const AppHeader = () => {
    return (
        <header className={`${headerStyles.header}`}>
            <div className={`${headerStyles.wrapper}`}>
                <nav className={`${headerStyles.navigation} pt-4 pb-4`}>
                    <li className='pt-4 pr-5 pb-4 pl-5'>
                        <a href='https://' className={`${headerStyles.linkActive} text text_type_main-default`}>
                            <BurgerIcon type="primary" />
                            <span className='ml-2'>Конструктор</span>
                        </a>
                    </li>
                    <li className='pt-4 pr-5 pb-4 pl-5 ml-2'>
                        <a href='https://' className={`${headerStyles.link} text text_type_main-default`}>
                            <ListIcon type="secondary" />
                            <span className='ml-2'>Лента Заказов</span>
                        </a>
                    </li>
                </nav>
                <Logo />
                <nav className={headerStyles.navigation}>
                    <a href='https://' className={`${headerStyles.link} text text_type_main-default pt-4 pr-5 pb-4 pl-5`}>
                        <ProfileIcon type="secondary" />
                        <span className='ml-2'>Личный кабинет</span>
                    </a>
                </nav>
            </div>
        </header>
    )    
}

export default AppHeader
