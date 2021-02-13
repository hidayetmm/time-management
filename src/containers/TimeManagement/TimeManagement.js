import React from "react";
import AuthContext from "../../context/AuthContext";
import classes from "./TimeManagement.module.css";

import TimeManager from "./TimeManager/TimeManager";
import ManagerData from "./ManagerData/ManagerData";

function TimeManagement() {
  return (
    <AuthContext.Consumer>
      {(value) => {
        console.log("CONTEXT: ", value);
        return (
          <div className={classes.TimeManagement}>
            <TimeManager />
            <ManagerData />
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
}

export default TimeManagement;
