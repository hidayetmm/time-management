import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "./context/AuthContext";

import TimeManagement from "./containers/TimeManagement/TimeManagement";

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <AuthContext.Consumer>
      {(value) => {
        return (
          <Route
            {...rest}
            render={(props) =>
              authed === value.userDetails ? (
                <TimeManagement {...props} />
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
