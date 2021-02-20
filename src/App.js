import { React, Component } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthContext from "./context/AuthContext";

import Login from "./containers/Login/Login";
import RecordManagement from "./containers/RecordManagement/RecordManagement";
import Navigation from "./components/Navigation/Navigation";
import NotFound from "./components/NotFound/NotFound";
import Registration from "./containers/Registration/Registration";
import PrivateRoute from "./PrivateRoute";

class App extends Component {
  state = {
    userDetails: JSON.parse(localStorage.getItem("user")),
  };

  setUserDetailsHandler = (userDetails) => {
    this.setState({ userDetails: userDetails });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          userDetails: this.state.userDetails,
          setUserDetails: this.setUserDetailsHandler,
        }}
      >
        <div className="App">
          <Navigation />
          <Switch>
            <PrivateRoute
              authed={this.state.userDetails}
              path="/records"
              component={RecordManagement}
            />
            <Redirect exact from="/" to="/records" />
            <Route path="/login" component={Login} />
            <Route path="/registration" component={Registration} />
            <Route path="/404" component={NotFound} />
            <Redirect from="*" to="/404" />
          </Switch>
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
