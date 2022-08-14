import { useState, useEffect } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../appHeader/appHeader'
import BurgerIngredients from '../burgerIngredients/burgerIngredients'
import BurgerConstructor from '../burgerConstructor/burgerConstructor'
import getIngridients from '../../utils/api'
import Modal from '../modal/modal'
import OrderDetails from '../modal/orderDetails/orderDetails'

function App() {
  const [apiData, setApiData] = useState({
    isLoading: false,
    hasError: false,
    errorMessage: '',
    data: []
  });

  useEffect(() => {
    getIngridients(apiData, setApiData);
  }, []);
  
  const [currentItem, setCurrentItem] = useState(false);
  const clickElements = () => setCurrentItem(!currentItem);
    
  

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
        <p className={`text text_type_main-large`}>Загружаем ингридиенты...</p>
      }

      {
        apiData.hasError &&
        <h1 className={`text text_type_main-large`}>
          Что-то пошло не так... Ошибка: {apiData.errorMessage}
        </h1>
      }

      {
        !apiData.isLoading &&
        !apiData.hasError &&
      <div className={`${appStyles.twoClumns} pr-5 pl-5 pt-10`}>
        <BurgerIngredients data={apiData.data} clickElements={clickElements} />
        <BurgerConstructor ingredients={apiData.data} openModal={openOrderModal}/> 
      </div>
      }
        {isOrderDetails && (
        <Modal closeModal={closeModals} title="">
          <OrderDetails />
        </Modal>
      )}
      {currentItem && (
        <Modal closeModal={closeModals} title="Детали ингредиента">
          {/* <IngredientDetails ingredient={currentItem} /> */}
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;