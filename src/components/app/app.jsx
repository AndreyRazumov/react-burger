import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../appHeader/appHeader'
import Modal from '../modal/modal'
import IngredientDetails from '../modal/ingredientDetails/ingredientDetails';
import ProtectedRoute from '../protectedRoute/protectedRoute';
import AnonimusRoute from '../anonimusRoute/anonimusRoute';
import { getCookie } from '../../utils/utils';
import { useAuth } from '../../utils/hooks/authHook';
import { useGetIngredients } from '../../utils/hooks/getIngredientsHook';
import Preloader from '../preloader/preloader';
import FeedOrderDetails from '../feedContent/feedOrderDetails/feedOrderDetails';
import { getOrders } from '../../services/selectors';
import { RequestStatus } from '../../utils/const';
import { RESET_INGREDIENTS_FAILED } from '../../services/actions/actions';
import {
  HomePage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  IngredientPage,
  NotFoundPage,
  FeedPage,
  FeedOrderDetailsPage,
  ProfileOrdersPage,
  ProfileOrderDetailsPage,
} from '../../pages';

function App() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  useAuth();

  const { authRequest, message } = useSelector(store => store.userReducer);
  const background = location.state && location.state.background;
  const ingredientsRequestStatus = useGetIngredients();

  const closeErrorPopup = () => {
    if (ingredientsRequestStatus === RequestStatus.failed) {
      dispatch({ type: RESET_INGREDIENTS_FAILED });
    }
  };

  const onClose = () => {
    history.goBack();
  };

  const orders = useSelector(getOrders);

  if (authRequest || (message === '' && getCookie('token'))) {
    return (<Preloader />);
  } else {
    return (
      <>
        <div className={styles.app}>
          <AppHeader />
          {
            ingredientsRequestStatus === RequestStatus.failed &&
            <Modal closeModal={closeErrorPopup} title="">
              <p className={styles.text}>
                Что-то пошло не так... Перезагрузите страницу!
              </p>
            </Modal>
          }
          {
            ingredientsRequestStatus !== RequestStatus.failed &&
            (
              <Switch location={background || location}>

                <Route path="/" exact>
                  <DndProvider backend={HTML5Backend}>
                    <HomePage />
                  </DndProvider>
                </Route>

                <Route path="/feed" exact>
                  <FeedPage />
                </Route>

                <Route path="/feed/:id" exact>
                  <FeedOrderDetailsPage />
                </Route>

                <Route path="/ingredients/:id" exact>
                  <IngredientPage />
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

                <ProtectedRoute path="/profile/orders/:id" exact>
                  <ProfileOrderDetailsPage />
                </ProtectedRoute>

                <ProtectedRoute path="/profile/orders" exact>
                  <ProfileOrdersPage />
                </ProtectedRoute>

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
            )}

          {
            background && (
              <Route path="/ingredients/:id" exact>
                <Modal closeModal={onClose} title="Детали ингредиента">
                  <IngredientDetails />
                </Modal>
              </Route>
            )}

          {
            background && orders.length && (
              <Route path="/feed/:id" exact>
                <Modal
                  title=''
                  closeModal={onClose}
                >
                  <FeedOrderDetails />
                </Modal>
              </Route>
            )}

          {
            background && orders.length && (
              <Route path="/profile/orders/:id" exact>
                <Modal
                  title=''
                  closeModal={onClose}
                >
                  <FeedOrderDetails />
                </Modal>
              </Route>
            )}

        </div>
      </>
    );
  }
}

export default App