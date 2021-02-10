import React from "react";
import AuthContext from "../../context/AuthContext";

import TimeManager from "./TimeManager/TimeManager";
import ManagerData from "./ManagerData/ManagerData";

function TimeManagement() {
  return (
    <AuthContext.Consumer>
      {(value) => {
        console.log("CONTEXT: ", value);
        return (
          <div style={{ height: 400, width: "100%" }}>
            <TimeManager />
            <ManagerData />
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
}

export default TimeManagement;
