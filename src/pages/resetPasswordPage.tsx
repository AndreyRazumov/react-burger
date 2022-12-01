import { useMemo, FC, FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import { useHistory } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import AdditionalActions from '../components/additionalActions/additionalActions';
import Modal from '../components/modal/modal';
import Preloader from '../components/preloader/preloader';
import styles from './page.module.css';
import {
  USER_FORM_SET_VALUE,
  CLEAR_REQUESTS_MESSAGE,
} from '../services/constants';
import { resetPassword } from '../services/actions/user';
import { TInput } from "../utils/types";

const additionalItems = [
  {
    text: 'Вспомнили пароль?',
    link: '/login',
    linkText: 'Войти'
  }
];

let buttonIsDisabled = true;

const ResetPasswordPage: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { password, code } = useSelector(state => state.userReducer.input);
  const { resetPassRequest, message } = useSelector(state => state.userReducer);

  const onFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(resetPassword({ password, token: code }));
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
          resetPassRequest === "pending" && <Preloader />
        }
      </form>
      <AdditionalActions additionalItems={additionalItems} />
      {
        resetPassRequest === "failed" &&
        <Modal title='' closeModal={onCloseErrorPopup}>
          <h2 className={styles.modal}>Ошибка!</h2>
          <p className={styles.text}>{message}</p>
        </Modal>
      }
      {
        resetPassRequest === "success" &&
        <Modal title='' closeModal={onCloseSuccessPopup}>
          <h2 className={styles.modal}>Поздравляем!</h2>
          <p className={styles.text}>Пароль был успешно изменен</p>
        </Modal>
      }
    </main>
  );
};

export default ResetPasswordPage;