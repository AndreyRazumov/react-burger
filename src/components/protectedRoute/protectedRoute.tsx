import { FC } from "react";
import { useAuth } from "../../utils/hooks/authHook";
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';
import Preloader from "../preloader/preloader";

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuth, authRequest } = useAuth();
  const location = useLocation();

  if (authRequest === "pending") {
    return <Preloader />;
  }

  if (!isAuth) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location },
        }}
      />
    );
  }

  return <Route {...rest}>{children}</Route>;
};

export default ProtectedRoute