import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import tabElementStyle from './tabElement.module.css'

const TabElement = ({ current, handleTabClick }) => {

    return (
        <nav className={`${tabElementStyle.main}`}>
            <Tab value="bun" active={current === 'bun'} onClick={handleTabClick}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={handleTabClick}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={handleTabClick}>
                Начинки
            </Tab>
        </nav>
    )
}

export default TabElement
