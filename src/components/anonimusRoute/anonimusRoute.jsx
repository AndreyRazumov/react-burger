import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function AnonimusRoute({ children, ...rest }) {
  const { isAuth } = useSelector(state => state.userReducer.data);
  return (
    <Route
      {...rest}
      render={() => !isAuth ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      )
      }
    />
  );
}

AnonimusRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AnonimusRoute