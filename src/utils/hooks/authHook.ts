import { useEffect } from 'react';
import { useDispatch, useSelector } from "../../services/hooks";
import { authUser } from '../../services/actions/user';
import { getCookie } from '../utils';


export const useAuth = () => {
  const dispatch = useDispatch();

  const { authRequest, isAuth } = useSelector(store => store.userReducer);

  const token = getCookie("token");

  useEffect(() => {
    dispatch(authUser());
  }, [token, dispatch]);

  return { isAuth, authRequest };
};
