import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import AdditionalActions from '../components/additionalActions/additionalActions';
import Modal from '../components/modal/modal';
import Preloader from '../components/preloader/preloader';
import styles from './page.module.css'
import { regEmail } from '../utils/const';
import {
  loginUser,
  USER_FORM_SET_VALUE,
  CLEAR_REQUESTS_MESSAGE,
} from '../services/actions/user';

const additionalItems = [
  {
    text: 'Вы — новый пользователь?',
    link: '/register',
    linkText: 'Зарегистрироваться'
  },
  {
    text: 'Забыли пароль?',
    link: '/forgot-password',
    linkText: 'Восстановить пароль'
  }
];

const LoginPage = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const pathname = location.state?.from.pathname || '/';

  const [isEmail, setIsEmail] = useState(true);
  const { email, password } = useSelector(state => state.userReducer.input);
  const { data, loginRequest, loginError, message } = useSelector(state => state.userReducer);

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    dispatch(loginUser({ email, password }));
    dispatch(loginUser(history));
  };

  const handleInputChange = (evt) => {
    dispatch({
      type: USER_FORM_SET_VALUE,
      field: evt.target.name,
      value: evt.target.value
    })
  };

  const onCloseErrorPopup = () => {
    dispatch({
      type: CLEAR_REQUESTS_MESSAGE,
    });
  }


  const checkEmailCorrect = () => {
    if (email !== '') {
      setIsEmail(regEmail.test(email));
    }
  }

  useEffect(() => {
    if (data.isAuth) {
      history.replace({ pathname });
    }
  }, [data.isAuth, history, pathname]);

  return (
    <main className={styles.wrapper}>
      <form
        className={styles.form}
        noValidate
        onSubmit={onFormSubmit}
      >
        <h1 className={styles.title}>Вход</h1>
        <Input
          placeholder='E-mail'
          value={email}
          name='email'
          onChange={handleInputChange}
          onBlur={checkEmailCorrect}
          error={!isEmail}
          errorText='Введите корректный email'
        />
        <PasswordInput
          name='password'
          value={password}
          onChange={handleInputChange}
          placeholder='Пароль'
        />
        {
          !loginRequest && <Button
            type='primary'
            size='medium'
            disabled={!email || !password}
            htmlType='submit'
          >
            Войти
          </Button>
        }
      </form>
      <AdditionalActions additionalItems={additionalItems} />
      {
        loginRequest && <Preloader />
      }
      {
        loginError &&
        <Modal title='' closeModal={onCloseErrorPopup}>
          <h2 className={styles.modal}>Ошибка!</h2>
          <p className={styles.text}>{message}</p>
        </Modal>
      }
    </main>
  );
};

export default LoginPage;