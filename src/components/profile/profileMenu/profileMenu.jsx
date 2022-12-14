import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser } from "../../../services/actions/user";
import styles from './profileMenu.module.css';

const ProfileMenu = () => {
    const dispatch = useDispatch();

    const logoutButtonHandler = () => {
        dispatch(logoutUser());
    };

    return (
        <nav className={styles.nav}>
            <menu className={styles.list}>
                <li>
                    <NavLink
                        to={`/profile`}
                        exact
                        className={styles.link}
                        activeClassName={styles.linkActive}
                    >
                        Профиль
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={`/profile/orders`}
                        exact
                        className={styles.link}
                        activeClassName={styles.linkActive}
                    >
                        История заказов
                    </NavLink>
                </li>
                <li>
                    <button
                        className={styles.button}
                        onClick={logoutButtonHandler}
                    >
                        Выход
                    </button>
                </li>
            </menu>
            <p className={styles.notes}>В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
        </nav>
    );
};

export default ProfileMenu;