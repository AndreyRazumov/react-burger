import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import appStyles from './app.module.css';
import AppHeader from '../appHeader/appHeader'
import BurgerIngredients from '../burgerIngredients/burgerIngredients'
import BurgerConstructor from '../burgerConstructor/burgerConstructor'
import Modal from '../modal/modal'
import OrderDetails from '../modal/orderDetails/orderDetails'
import IngredientDetails from '../modal/ingredientDetails/ingredientDetails';
import {
  ADD_INGREDIENT_DATA,
  DELETE_INGREDIENT_DATA,
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS,
  OPEN_ORDER_DETAILS,
  CLOSE_ORDER_DETAILS,
  getIngredients,
  getOrder,
} from '../../services/actions/actions';

function App() {
  const dispatch = useDispatch();
  const isIngredientDetailsOpened = useSelector((store) => store.modalReducer.isIngredientDetailsOpened);
  const isOrderDetailsOpened = useSelector((store) => store.modalReducer.isOrderDetailsOpened);
  const { ingredientsReducer, orderReducer } = useSelector((store) => store);
  

  const openOrderDetails = () => {
    dispatch({ type: OPEN_ORDER_DETAILS });
  };

  const openDetailsModal = (item) => {
    dispatch({ type: ADD_INGREDIENT_DATA, item });
    dispatch({ type: OPEN_INGREDIENT_DETAILS });
  }

  const closeModals = () => {
    dispatch({ type: DELETE_INGREDIENT_DATA });
    dispatch({ type: CLOSE_INGREDIENT_DETAILS });
    dispatch({ type: CLOSE_ORDER_DETAILS });
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const openOrderModal = (orderData) => {
    dispatch(getOrder(orderData));
    openOrderDetails();
  };


  if (ingredientsReducer.ingredientsRequest || orderReducer.orderRequest) {
    return (
      <Modal closeModal={closeModals} title="">
        <p className={`text text_type_main-large p-10`}>Загрузка...</p>
      </Modal>
    )
  }

  if (ingredientsReducer.ingredientsFaied || orderReducer.orderFaied) {
    return (
      <Modal closeModal={closeModals} title="">
        <p className={`text text_type_main-large p-10`}>
          Что-то пошло не так... Перезагрузите страницу!
        </p>
      </Modal>
    )
  }

  return (
    <div className={`${appStyles.app} pt-15 pb-10`}>
      <AppHeader />
      <div className={`${appStyles.twoClumns} pr-5 pl-5 pt-10`}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients
            openDetailsModal={openDetailsModal}
          />
          <BurgerConstructor
            openOrderModal={openOrderModal}
          />
        </DndProvider>
      </div>
      {isOrderDetailsOpened && (
        <Modal closeModal={closeModals} title="">
          <OrderDetails />
        </Modal>
      )}
      {isIngredientDetailsOpened && (
        <Modal closeModal={closeModals} title="Детали ингредиента">
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
}

export default App