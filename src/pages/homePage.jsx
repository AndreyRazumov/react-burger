import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BurgerIngredients from '../components/burgerIngredients/burgerIngredients'
import BurgerConstructor from '../components/burgerConstructor/burgerConstructor'
import Modal from '../components/modal/modal';
import OrderDetails from '../components/modal/orderDetails/orderDetails';
import styles from './page.module.css'
import {
  ADD_INGREDIENT_DATA,
  DELETE_INGREDIENT_DATA,
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS,
  OPEN_ORDER_DETAILS,
  CLOSE_ORDER_DETAILS,
  getIngredients,
  getOrder,
} from '../services/actions/actions';

const HomePage = () => {
  const dispatch = useDispatch();
  const isOrderDetailsOpened = useSelector(store => store.modalReducer.isOrderDetailsOpened);
  const { orderFaied } = useSelector(store => store);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const closeModals = () => {
    dispatch({ type: DELETE_INGREDIENT_DATA });
    dispatch({ type: CLOSE_INGREDIENT_DETAILS });
    dispatch({ type: CLOSE_ORDER_DETAILS });
  };

  const openDetailsModal = (item) => {
    dispatch({ type: ADD_INGREDIENT_DATA, item });
    dispatch({ type: OPEN_INGREDIENT_DETAILS });
  }

  const openOrderDetails = () => {
    dispatch({ type: OPEN_ORDER_DETAILS });
  };

  const openOrderModal = (orderData) => {
    dispatch(getOrder(orderData));
    openOrderDetails();
  };

  return (
    <div className={styles.wrapper}>
      {
        orderFaied &&
        <Modal closeModal={closeModals} title="">
          <p className={`text text_type_main-large p-10`}>
            Что-то пошло не так... Перезагрузите страницу!
          </p>
        </Modal>
      }
      {
        <div className={`${styles.twoClumns} pr-5 pl-5 pt-10`}>
          <BurgerIngredients
            openDetailsModal={openDetailsModal}
          />
          <BurgerConstructor
            openOrderModal={openOrderModal}
          />
        </div>
      }
      {
        isOrderDetailsOpened && (
          <Modal closeModal={closeModals} title="">
            <OrderDetails />
          </Modal>
        )}
    </div>
  );
}

export default HomePage