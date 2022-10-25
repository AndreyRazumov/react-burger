import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './tabElement.module.css'

const TabElement = ({ current, onTabClick }) => {

    return (
        <nav className={style.main}>
            <Tab value="bun" active={current === 'bun'} onClick={onTabClick}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={onTabClick}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={onTabClick}>
                Начинки
            </Tab>
        </nav>
    )
}

export default TabElement
