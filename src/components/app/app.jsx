import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import appStyles from './app.module.css';
import AppHeader from '../appHeader/appHeader'
import BurgerIngredients from '../burgerIngredients/burgerIngredients'
import BurgerConstructor from '../burgerConstructor/burgerConstructor'
import Modal from '../modal/modal'
import OrderDetails from '../modal/orderDetails/orderDetails'
import IngredientDetails from '../modal/ingredientDetails/ingredientDetails';
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  ADD_INGREDIENT_DATA,
  DELETE_INGREDIENT_DATA,
  MOVE_CONSTRUCTOR_ELEMENT,
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS,
  OPEN_ORDER_DETAILS,
  CLOSE_ORDER_DETAILS,
  POST_ORDER_FAILED,
  getIngredients,
  getOrder,
} from '../../services/actions/actions';

function App() {
  const dispatch = useDispatch();

  const currentBurger = useSelector((store) => store.currentBurgerReducer.currentBurger);
  const isIngredientDetailsOpened = useSelector((store) => store.modalReducer.isIngredientDetailsOpened);
  const isOrderDetailsOpened = useSelector((store) => store.modalReducer.isOrderDetailsOpened);


  const currentBurgerIngredients = [...currentBurger].filter((item) => item.type !== 'bun');

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
    dispatch({ type: POST_ORDER_FAILED });
    dispatch({ type: CLOSE_ORDER_DETAILS });
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const openOrderModal = (orderData) => {
    dispatch(getOrder(orderData));
    openOrderDetails();

  };

  const handleDrop = (item) => {
    if (item.type === 'bun') {
      const bun = currentBurger.find((element) => element.type === 'bun');
      const index = currentBurger.indexOf(bun);
      if (index !== -1) {
        dispatch({ type: DELETE_INGREDIENT, index });
      }
    }
    dispatch({ type: ADD_INGREDIENT, item });
  };

  const handleMove = useCallback((dragIndex, hoverIndex) => {
    const bun = [...currentBurger].find((item) => item.type === 'bun');
    const dragElement = currentBurgerIngredients[dragIndex];
    const payload = bun
      ? [bun, ...update(currentBurgerIngredients, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragElement],
        ],
      })]
      : update(currentBurgerIngredients, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragElement],
        ],
      });
    dispatch({ type: MOVE_CONSTRUCTOR_ELEMENT, payload });
  }, [currentBurgerIngredients]);

  const handleDeleteIngredient = (item) => {
    const index = currentBurger.indexOf(item);
    dispatch({ type: DELETE_INGREDIENT, index });
  };

  return (
    <div className={`${appStyles.app} pt-15 pb-10`}>
      <AppHeader />
      <div className={`${appStyles.twoClumns} pr-5 pl-5 pt-10`}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients
            openDetailsModal={openDetailsModal}
             />
          <BurgerConstructor 
            openOrderModal={ openOrderModal } 
            onDrop={handleDrop} 
            onMove={ handleMove } 
            onDelete={ handleDeleteIngredient }
            />
        </DndProvider>
      </div>
        {isOrderDetailsOpened  && (
        <Modal closeModal={closeModals} title="">
          <OrderDetails />
        </Modal>
      )}
      {isIngredientDetailsOpened  && (
        <Modal closeModal={closeModals} title="Детали ингредиента">
          <IngredientDetails  />
        </Modal>
      )}
    </div>
  );
}

export default App