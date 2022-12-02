import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, useLocation } from 'react-router-dom';
import styles from './appHeader.module.css'

const AppHeader = () => {
    const location = useLocation();
    return (
        <header className={`${styles.header}`}>
            <div className={`${styles.wrapper}`}>
                <nav className={`${styles.navigation} pt-4 pb-4`}>
                    <li className='pt-4 pr-5 pb-4 pl-5'>
                        <NavLink exact to="/" className={`${styles.link} text text_type_main-default`} activeClassName={styles.linkActive}>
                            <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'} />
                            <span className='ml-2'>Конструктор</span>
                        </NavLink>
                    </li>
                    <li className='pt-4 pr-5 pb-4 pl-5 ml-2'>
                        <NavLink exact to="/feed" className={`${styles.link} text text_type_main-default`} activeClassName={styles.linkActive}>
                            <ListIcon type={location.pathname === '/feed' ? 'primary' : 'secondary'} />
                            <span className='ml-2'>Лента Заказов</span>
                        </NavLink>
                    </li>
                </nav>
                <Logo />
                <nav className={styles.navigation}>
                    <NavLink exact to="/profile" className={`${styles.link} text text_type_main-default pt-4 pr-5 pb-4 pl-5`} activeClassName={styles.linkActive}>
                        <ProfileIcon type={location.pathname === '/profile' ? 'primary' : 'secondary'} />
                        <span className='ml-2'>Личный кабинет</span>
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}

export default AppHeader
