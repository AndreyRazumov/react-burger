import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../appHeader/appHeader'

function App() {
  return (

    <div className={`${appStyles.app} pt-15 pb-10`}>
      <AppHeader />
    </div>
  );
}

export default App;