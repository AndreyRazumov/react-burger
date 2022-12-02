import { FC } from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import BurgerIngredients from '../components/burgerIngredients/burgerIngredients'
import BurgerConstructor from '../components/burgerConstructor/burgerConstructor'
import Modal from '../components/modal/modal';
import OrderDetails from '../components/modal/orderDetails/orderDetails';
import styles from './page.module.css'
import { CLEAR_CURRENT_BURGER } from '../services/constants';

const HomePage: FC = () => {
  const dispatch = useDispatch();
  const { number: orderNumber, orderIngredientsIdRequest } = useSelector(store => store.orderReducer);
  const closeErrorPopup = () => { orderIngredientsIdRequest === "failed" && dispatch({ type: CLEAR_CURRENT_BURGER }); };

  return (
    <div className={styles.wrapper}>
      {
        orderIngredientsIdRequest === "failed" &&
        <Modal closeModal={closeErrorPopup} title="">
          <p className={`text text_type_main-large p-10`}>
            Что-то пошло не так... Перезагрузите страницу!
          </p>
        </Modal>
      }
      {
        <div className={`${styles.twoClumns} pr-5 pl-5 pt-10`}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      }
      {
        orderNumber && (
          <Modal closeModal={() => dispatch({ type: CLEAR_CURRENT_BURGER })} title="">
            <OrderDetails orderNumber={orderNumber} />
          </Modal>
        )
      }
    </div>
  );
}

export default HomePage