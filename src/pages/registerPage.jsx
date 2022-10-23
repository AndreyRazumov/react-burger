import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import AdditionalActions from '../components/additionalActions/additionalActions';
import Modal from '../components/modal/modal';
import Preloader from '../components/preloader/preloader';
import styles from './page.module.css'
import { regEmail } from '../utils/const';
import {
  registerUser,
  USER_FORM_SET_VALUE,
  CLEAR_REQUESTS_MESSAGE,
} from '../services/actions/user';

const additionalItems = [
  {
    text: 'Уже зарегистрированы?',
    link: '/login',
    linkText: 'Войти'
  }
];

let buttonIsDisabled = true;

const RegisterPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isEmail, setIsEmail] = useState(true);
  const { name, email, password } = useSelector(state => state.userReducer.input);
  const { registerRequest, registerError, message, data } = useSelector(state => state.userReducer);

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    dispatch(registerUser({ name, email, password }));
  }

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
  };

  const onCloseSuccessPopup = () => {
    dispatch({
      type: CLEAR_REQUESTS_MESSAGE,
    });
    history.replace({
      pathname: '/',
      state: {
        from: {
          pathname: '/'
        }
      }
    });
  };

  const checkEmailCorrect = () => {
    if (email !== '') {
      setIsEmail(regEmail.test(email));
    }
  }

  useEffect(() => {
    buttonIsDisabled = !email || !password || !name;
  }, [email, password, name]);

  return (
    <main className={styles.wrapper}>
      <form
        className={styles.form}
        noValidate
        onSubmit={onFormSubmit}
      >
        <h1 className={styles.title}>Регистрация</h1>
        <Input
          placeholder='Имя'
          value={name}
          name='name'
          onChange={handleInputChange}
        />
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
          !registerRequest && <Button
            type='primary'
            size='medium'
            disabled={buttonIsDisabled}
            htmlType='submit'
          >
            Зарегистрироваться
          </Button>
        }
        {
          registerRequest && <Preloader />
        }
      </form>
      <AdditionalActions additionalItems={additionalItems} />
      {
        registerError &&
        <Modal title='' closeModal={onCloseErrorPopup}>
          <h2 className={styles.modal}>Ошибка!</h2>
          <p className={styles.text}>{message}</p>
        </Modal>
      }
      {
        data.isAuth &&
        <Modal title='' closeModal={onCloseSuccessPopup}>
          <h2>Поздравляем!</h2>
          <p>Вы успешно зарегистрировались! Пора оформить заказ!</p>
        </Modal>
      }
    </main>
  );
}

export default RegisterPage;