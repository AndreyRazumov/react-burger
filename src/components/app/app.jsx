import { useState, useEffect } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../appHeader/appHeader'
import BurgerIngredients from '../burgerIngredients/burgerIngredients'
import BurgerConstructor from '../burgerConstructor/burgerConstructor'
import getIngredients from '../../utils/api'
import Modal from '../modal/modal'
import OrderDetails from '../modal/orderDetails/orderDetails'
import IngredientDetails from '../modal/ingredientDetails/ingredientDetails';

function App() {
  const [apiData, setApiData] = useState({
    isLoading: false,
    hasError: false,
    errorMessage: '',
    data: []
  });

  useEffect(() => {
    getIngredients(apiData, setApiData);
  }, []);

  const [currentItem, setCurrentItem] = useState(null);
  const openDetailsModal = (elem) => {
    if (elem) {
      setCurrentItem(elem);
    }
  };

  const [isOrderDetails, setIsOrderDetails] = useState(false);

  const closeModals = () => {
    setIsOrderDetails(false);
    setCurrentItem(null);
  };

  const openOrderModal = () => {
    setIsOrderDetails(true);
  };

  return (
    <div className={`${appStyles.app} pt-15 pb-10`}>
      <AppHeader />

      {
        apiData.isLoading && 
        <Modal closeModal={closeModals} title="">
          <p className={`text text_type_main-large p-10`}>Загружаем ингредиенты...</p>
        </Modal>
      }
      {
        apiData.hasError &&
        <Modal closeModal={closeModals} title="">
          <p className={`text text_type_main-large p-10`}>
            Что-то пошло не так... Ошибка: {apiData.errorMessage}
          </p>
        </Modal>
      }

      {
        !apiData.isLoading &&
        !apiData.hasError &&
      <div className={`${appStyles.twoClumns} pr-5 pl-5 pt-10`}>
        <BurgerIngredients data={apiData.data} openDetailsModal={openDetailsModal} />
        <BurgerConstructor ingredients={apiData.data} openOrderModal={openOrderModal}/> 
      </div>
      }
        {isOrderDetails  && (
        <Modal closeModal={closeModals} title="">
          <OrderDetails />
        </Modal>
      )}
      {currentItem && (
        <Modal closeModal={closeModals} title="Детали ингредиента">
          <IngredientDetails ingredient={currentItem}/>
        </Modal>
      )}
    </div>
  );
}

export default App