import React from "react";
import ReactDOM from 'react-dom/client';
import { compose } from "redux";
import './index.css';
import { Provider } from "react-redux";
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { store } from '../src/services/store'
import { BrowserRouter as Router } from 'react-router-dom';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router >
  </Provider>
);

reportWebVitals();
