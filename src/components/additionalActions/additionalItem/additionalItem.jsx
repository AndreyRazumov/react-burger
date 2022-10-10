import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './additionalItem.module.css';

function AdditionalItem({ text, link, linkText }) {
  return (
    <li className='m-4'>
      <p className={`${styles.item} text text_type_main-small`}>
        {text} <Link to={link} className={styles.link}>{linkText}</Link>
      </p>
    </li>
  );
}

AdditionalItem.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired
};

export default AdditionalItem;