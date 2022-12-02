import { FC, ReactNode } from "react";
import styles from './modalOverlay.module.css';

interface IModalOverlay {
    children: ReactNode;
    modalClick: () => void;
}

const ModalOverlay: FC<IModalOverlay> = ({ children, modalClick }) => {
    return (
        <section className={styles.main} onClick={modalClick}>
            {children}
        </section>
    );
};

export default ModalOverlay;