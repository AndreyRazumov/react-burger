import { useState, useMemo, useEffect, FC, FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import { useHistory } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import AdditionalActions from '../components/additionalActions/additionalActions';
import Modal from '../components/modal/modal';
import Preloader from '../components/preloader/preloader';
import styles from './page.module.css';
import {
  USER_FORM_SET_VALUE,
  CLEAR_REQUESTS_MESSAGE,
} from '../services/constants';
import { recoveryPassword } from '../services/actions/user'
import { regEmail } from '../utils/const';
import { TInput } from "../utils/types";

const additionalItems = [
  {
    text: 'Вспомнили пароль?',
    link: '/login',
    linkText: 'Войти'
  }
];

let buttonIsDisabled = true;

const ForgotPasswordPage: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isEmail, setIsEmail] = useState(true);
  const { email } = useSelector(state => state.userReducer.input);
  const { forgotPassRequest, message } = useSelector(state => state.userReducer);

  const onFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(recoveryPassword(email));
  };

  const handleInputChange = (evt: ChangeEvent<TInput>) => {
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

  useMemo(() => {
    buttonIsDisabled = !email;
  }, [email]);

  useEffect(() => {
    if (message && forgotPassRequest !== "failed") {
      dispatch({ type: CLEAR_REQUESTS_MESSAGE })
      history.replace({
        pathname: '/reset-password',
        state: '/login'
      });
    }
  }, [history, message, forgotPassRequest, dispatch]);

  return (
    <main className={styles.wrapper}>
      <form
        className={styles.form}
        noValidate
        onSubmit={onFormSubmit}
      >
        <h1 className={styles.title}>Восстановление пароля</h1>
        <Input
          placeholder='E-mail'
          value={email}
          name='email'
          onChange={handleInputChange}
          onBlur={checkEmailCorrect}
          error={!isEmail}
          errorText='Введите корректный email'
        />
        {
          forgotPassRequest && <Button
            htmlType='submit'
            type='primary'
            size='medium'
            disabled={buttonIsDisabled}
          >
            Восстановить
          </Button>
        }
        {
          forgotPassRequest === "pending" && <Preloader />
        }
      </form>
      <AdditionalActions additionalItems={additionalItems} />
      {
        forgotPassRequest === "failed" &&
        <Modal title='' closeModal={onCloseErrorPopup}>
          <h2 className={styles.modal}>Ошибка!</h2>
          <p className={styles.text}>{message}</p>
        </Modal>
      }
    </main>
  );
};

export default ForgotPasswordPage