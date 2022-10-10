import PropTypes from 'prop-types';
import styles from './modalOverlay.module.css';

const ModalOverlay = ({ children, modalClick }) => {
    return (
        <section className={styles.main} onClick={modalClick}>
            {children}
        </section>
    );
};

ModalOverlay.propTypes = {
    modalClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};


export default ModalOverlay;