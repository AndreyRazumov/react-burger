import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../appHeader/appHeader'
import Modal from '../modal/modal'
import OrderDetails from '../modal/orderDetails/orderDetails'
import IngredientDetails from '../modal/ingredientDetails/ingredientDetails';
import ProtectedRoute from '../protectedRoute/protectedRoute';
import AnonimusRoute from '../anonimusRoute/anonimusRoute';
import { getCookie } from '../../utils/utils';
import { useAuth } from '../../utils/hooks/authHook';
import Preloader from '../preloader/preloader';
import { getIngredients } from '../../services/actions/actions';
import {
  HomePage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  IngredientPage,
  NotFoundPage,
} from '../../pages';

function App() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { ingredientsFaied } = useSelector(store => store.ingredientsReducer);
  const { authRequest, message } = useSelector(store => store.userReducer);
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useAuth();

  const onClose = () => {
    history.goBack();
  };

  if (authRequest || (message === '' && getCookie('token'))) {
    return (<Preloader />);
  } else {
    return (
      <>
        <div className={`${styles.app} pt-15 pb-10`}>
          <AppHeader />
          {
            ingredientsFaied &&
            <Modal closeModal={onClose} title="">
              <p className={`text text_type_main-large p-10`}>
                Что-то пошло не так... Перезагрузите страницу!
              </p>
            </Modal>
          }
          <Switch location={background || location}>

            <Route path="/" exact>
              <DndProvider backend={HTML5Backend}>
                <HomePage />
              </DndProvider>
            </Route>

            <Route path="/ingredients/:id" exact>
              <IngredientPage />
            </Route>

            <Route path="/profile/orders/:orderNumber" exact>
              <OrderDetails />
            </Route>

            <AnonimusRoute path="/login" exact>
              <LoginPage />
            </AnonimusRoute>

            <AnonimusRoute path="/register" exact>
              <RegisterPage />
            </AnonimusRoute>

            <AnonimusRoute path="/forgot-password" exact>
              <ForgotPasswordPage />
            </AnonimusRoute>

            <AnonimusRoute path="/reset-password" exact>
              <ResetPasswordPage />
            </AnonimusRoute>

            <ProtectedRoute path="/profile">
              <ProfilePage />
            </ProtectedRoute>

            <Route>
              <NotFoundPage />
            </Route>

            <Route path="/ingredients" exact>
              <IngredientPage />
            </Route>

          </Switch>

          {background && (
            <Route path="/ingredients/:id" exact>
              <Modal closeModal={onClose} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            </Route>
          )}

        </div>
      </>
    );
  }
}

export default App