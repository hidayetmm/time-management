import React from "react";

const AuthContext = React.createContext({
  userDetails: null,
  setUserDetails: (userDetails) => {},
});

export default AuthContext;
