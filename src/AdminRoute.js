import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "./context/AuthContext";

function AdminRoute({ component: Component, authed, ...rest }) {
  return (
    <AuthContext.Consumer>
      {(value) => {
        return (
          <Route
            {...rest}
            render={(props) =>
              value.userDetails && value.userDetails.role === "ROLE_ADMIN" ? (
                <Component {...props} />
              ) : (
                <Redirect
                  to={{ pathname: "/403", state: { from: props.location } }}
                />
              )
            }
          />
        );
      }}
    </AuthContext.Consumer>
  );
}

export default AdminRoute;
