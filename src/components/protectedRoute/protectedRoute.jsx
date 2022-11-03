import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ children, ...rest }) {
  const { isAuth } = useSelector(state => state.userReducer.data);
  return (
    <Route
      {...rest}
      render={({ location }) => isAuth ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location }
          }}
        />
      )
      }
    />
  );
}


export default ProtectedRoute;