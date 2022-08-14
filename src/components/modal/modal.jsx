import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import modalStyles from './modal.module.css';
import ModalOverlay from './modalOverlay/modalOverlay'

export default function Modal({ children, title, closeModal }) {
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
  
  // const onModalClick = (evt) => {
  //   evt.stopPropagation();
  // }

  return createPortal(
    <>
      <section>
        <ModalOverlay onModalClick={closeModal}>
          <div className={modalStyles.container}>
            <div className={`${modalStyles.text} pt-10 pr-10 pl-10`}>
              <h1 className="text text_type_main-large">{title}</h1>
              <button className={modalStyles.button} onClick={closeModal}>
                <CloseIcon type="primary" />
              </button>
            </div>
            {children}
          </div>
        </ModalOverlay>
      </section>
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};