import { FC } from "react";
import { v4 as uuidv4 } from 'uuid';
import AdditionalItem from './additionalItem/additionalItem';
import styles from './additionalActions.module.css';

interface IAdditionalItem {
  text: string;
  link: string;
  linkText: string;
}

interface IAdditionalItemProps {
  additionalItems: IAdditionalItem[];
}

const AdditionalActions: FC<IAdditionalItemProps> = ({ additionalItems }) => {
  return (
    <ul className={styles.container}>
      {
        additionalItems.map((
          item: IAdditionalItem) => (
          <AdditionalItem
            key={uuidv4()}
            text={item.text}
            link={item.link}
            linkText={item.linkText}
          />
        )
        )
      }
    </ul>
  );
};

export default AdditionalActions;