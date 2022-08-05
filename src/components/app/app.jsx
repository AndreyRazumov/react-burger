import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../appHeader/appHeader'
import BurgerIngredients from '../burgerIngredients/burgerIngredients'

function App() {
  return (

    <div className={`${appStyles.app} pt-15 pb-10`}>
      <AppHeader />
      <BurgerIngredients />
    </div>
  );
}

export default App;