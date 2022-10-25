import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from './modalOverlay/modalOverlay'

const modalRoot = document.getElementById('modals');

const Modal = ({ children, title, closeModal }) => {

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);



  const stopClickPropagation = (evt) => {
    evt.stopPropagation();
  }

  return createPortal(
    <ModalOverlay modalClick={closeModal}>
      <div className={styles.container} onClick={stopClickPropagation}>
        <h1 className={styles.text} onClick={stopClickPropagation}>{title}</h1>
        <button className={styles.button} onClick={closeModal}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired,
  ]),
  title: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal