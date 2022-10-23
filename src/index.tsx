import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from "react-redux";
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { store } from '../src/services/store'
import { BrowserRouter as Router } from 'react-router-dom';



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
