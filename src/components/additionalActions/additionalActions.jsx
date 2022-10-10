import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import AdditionalItem from './additionalItem/additionalItem';
import styles from './additionalActions.module.css';

function AdditionalActions({ additionalItems }) {
  return (
    <ul className={styles.container}>
      {
        additionalItems.map(
          item => (
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

AdditionalActions.propTypes = {
  additionalItems: PropTypes.array.isRequired
};

export default AdditionalActions;