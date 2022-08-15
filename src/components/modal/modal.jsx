import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import modalStyles from './modal.module.css';
import ModalOverlay from './modalOverlay/modalOverlay'

const Modal = ({ children, title, closeModal }) => {
  const modalRoot = document.getElementById('modals');

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);
  
  const handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      closeModal();
    }
  };
  
  const onModalClick = (evt) => {
    evt.stopPropagation();
  }

  return createPortal(
        <ModalOverlay modalClick={closeModal}>
          <div className={`${modalStyles.container} p-10`} onClick={onModalClick}>
            <h1 className={`${modalStyles.text} text text_type_main-large mt-4`} onClick={onModalClick}>{title}</h1>
              <button className={modalStyles.button} onClick={closeModal}>
                <CloseIcon type="primary" />
              </button>
            {children}
          </div>
        </ModalOverlay>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal