import PropTypes from 'prop-types';
import modalOverlayStyles from './modalOverlay.module.css';

const ModalOverlay = ({ children, modalClick }) => {
    return (
        <section className={modalOverlayStyles.main} onClick={modalClick}>
            {children}
        </section>
    );
};

ModalOverlay.propTypes = {
    modalClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};


export default ModalOverlay;