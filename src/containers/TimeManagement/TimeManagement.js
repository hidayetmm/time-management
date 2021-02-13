import React from "react";
import AuthContext from "../../context/AuthContext";
import { Route, Redirect } from "react-router-dom";

import classes from "./TimeManagement.module.css";

import TimeManager from "./TimeManager/TimeManager";
import ManagerData from "./ManagerData/ManagerData";

function TimeManagement(props) {
  return (
    <AuthContext.Consumer>
      {(value) => {
        console.log("CONTEXT: ", value);

        return (
          <Route
            path={props.path}
            render={(props) =>
              props.authed === value.userDetails ? (
                <div className={classes.TimeManagement}>
                  <TimeManager />
                  <ManagerData />
                </div>
              ) : (
                <Redirect exact from="/management" to="/login" />
              )
            }
          />
        );
      }}
    </AuthContext.Consumer>
  );
}
// debugger;
export default TimeManagement;
