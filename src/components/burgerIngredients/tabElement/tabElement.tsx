import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './tabElement.module.css'
import { v4 as uuidv4 } from 'uuid';
import { FC } from "react"

interface ITabElement {
  tabs: {
    TYPE: string;
    NAME: string;
  }[];
  current: string;
  onTabClick: (tab: string) => void;
}

const TabElement: FC<ITabElement> = ({ tabs, current, onTabClick }) => {
  return (
    <nav className={style.main}>
      {tabs.map((tab) => (
        <Tab
          key={uuidv4()}
          value={tab.NAME}
          active={current === tab.TYPE}
          onClick={() => onTabClick(tab.TYPE)}
        >
          {tab.NAME}
        </Tab>
      ))}
    </nav>
  );
};

export default TabElement
