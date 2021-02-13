import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "./context/AuthContext";

import TimeManagement from "./containers/TimeManagement/TimeManagement";

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <AuthContext.Consumer>
      {(value) => {
        console.log(authed);
        console.log(value.userDetails);
        return (
          <Route
            {...rest}
            render={(props) =>
              authed ? (
                <Component {...props}>
                  <TimeManagement />
                </Component>
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
