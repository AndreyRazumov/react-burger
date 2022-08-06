import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../appHeader/appHeader'
import BurgerIngredients from '../burgerIngredients/burgerIngredients'
// import BurgerConstructor from '../burgerConstructor/burgerConstructor'
import data from '../../utils/data'

function App() {
  return (

    <div className={`${appStyles.app} pt-15 pb-10`}>
      <AppHeader />
      <BurgerIngredients  data={data}/>
      {/* <BurgerConstructor  data={data}/> */}
    </div>
  );
}

export default App;