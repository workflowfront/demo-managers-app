import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  loggedIn: boolean;
  [key: string]: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  loggedIn,
  ...props
}) => {
  return (
    <Route
      {...props}
      render={(routeProps) =>
        loggedIn ? (
          <Component {...routeProps} {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default ProtectedRoute;
