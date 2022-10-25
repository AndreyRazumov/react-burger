import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/actions';

export const useGetIngredients = () => {
  const dispatch = useDispatch();
  const { ingredientsRequest } = useSelector(state => state.ingredientsReducer);
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return ingredientsRequest;
};