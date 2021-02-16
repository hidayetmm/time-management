import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "./context/AuthContext";

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <AuthContext.Consumer>
      {(value) => {
        return (
          <Route
            {...rest}
            render={(props) =>
              value.userDetails ? (
                <Component {...props} />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
        );
      }}
    </AuthContext.Consumer>
  );
}

export default PrivateRoute;
