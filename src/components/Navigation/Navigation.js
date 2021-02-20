import { React, useContext } from "react";

import classes from "./Navigation.module.css";
import AuthContext from "../../context/AuthContext";
import { useHistory, withRouter } from "react-router-dom";

import { Menu } from "antd";
import {
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
  EditOutlined,
} from "@ant-design/icons";

function Navigation() {
  const userValue = useContext(AuthContext);
  const history = useHistory();

  const managementHandler = () => {
    history.replace("/records");
  };

  const logoutHandler = () => {
    localStorage.clear();
    userValue.setUserDetails(null);
    history.replace("/login");
  };

  const loginHandler = () => {
    history.replace("/login");
  };

  const registerHandler = () => {
    history.replace("/registration");
  };

  return (
    <div className={classes.Navigation}>
      <Menu
        mode="horizontal"
        selectedKeys={[history.location.pathname]}
        theme="dark"
      >
        {userValue.userDetails ? (
          <>
            <Menu.Item
              key="/records"
              icon={<EditOutlined />}
              onClick={managementHandler}
            >
              Records
            </Menu.Item>
            <Menu.Item
              key="logout"
              icon={<LogoutOutlined />}
              onClick={logoutHandler}
            >
              Logout
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item
              key="/login"
              icon={<LoginOutlined />}
              onClick={loginHandler}
            >
              Login
            </Menu.Item>
            <Menu.Item
              key="/registration"
              icon={<UserOutlined />}
              onClick={registerHandler}
            >
              Register
            </Menu.Item>
          </>
        )}
      </Menu>
    </div>
  );
}

export default withRouter(Navigation);
