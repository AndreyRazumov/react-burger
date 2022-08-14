import PropTypes from "prop-types";
import modalOverlayStyles from './modalOverlay.module.css';

const ModalOverlay = ({ children, onModalClick }) => {
    return (
        <div className={modalOverlayStyles.main} onClick={onModalClick}>
            {children}
        </div>
    );
};

ModalOverlay.propTypes = {    
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default ModalOverlay;