import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import AdditionalActions from '../components/additionalActions/additionalActions';
import Modal from '../components/modal/modal';
import Preloader from '../components/preloader/preloader';
import styles from './page.module.css';
import {
  resetPassword,
  USER_FORM_SET_VALUE,
  CLEAR_REQUESTS_MESSAGE,
} from '../services/actions/user';

const additionalItems = [
  {
    text: 'Вспомнили пароль?',
    link: '/login',
    linkText: 'Войти'
  }
];

let buttonIsDisabled = true;

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { password, code } = useSelector(state => state.userReducer.input);
  const { resetPassRequest, resetPassError, message } = useSelector(state => state.userReducer);

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    dispatch(resetPassword({ password, token: code }));
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
  };

  const onCloseSuccessPopup = () => {
    dispatch({
      type: CLEAR_REQUESTS_MESSAGE,
    });
    history.replace({
      pathname: '/login',
      state: {
        from: {
          pathname: '/profile'
        }
      }
    });
  };

  useMemo(() => {
    buttonIsDisabled = !password || !code;
  }, [password, code]);

  return (
    <main className={styles.wrapper}>
      <form
        className={styles.form}
        noValidate
        onSubmit={onFormSubmit}
      >
        <h1 className={styles.title}>Восстановление пароля</h1>
        <PasswordInput
          name='password'
          value={password}
          onChange={handleInputChange}
          placeholder='Введите новый пароль'
        />
        <Input
          placeholder='Введите код из письма'
          value={code}
          name='code'
          onChange={handleInputChange}
        />
        {
          !resetPassRequest && <Button
            type='primary'
            size='medium'
            disabled={buttonIsDisabled}
            htmlType='submit'
          >
            Сохранить
          </Button>
        }
        {
          resetPassRequest && <Preloader />
        }
      </form>
      <AdditionalActions additionalItems={additionalItems} />
      {
        resetPassError &&
        <Modal title='' closeModal={onCloseErrorPopup}>
          <h2 className={styles.modal}>Ошибка!</h2>
          <p className={styles.text}>{message}</p>
        </Modal>
      }
      {
        !resetPassError && !!message &&
        <Modal title='' closeModal={onCloseSuccessPopup}>
          <h2 className={styles.modal}>Поздравляем!</h2>
          <p className={styles.text}>Пароль был успешно изменен</p>
        </Modal>
      }
    </main>
  );
};

export default ResetPasswordPage;