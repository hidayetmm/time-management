import { React, useContext } from "react";

import AuthContext from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

import Menu from "antd/lib/menu";
import { LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

function Navigation() {
  const userValue = useContext(AuthContext);
  const history = useHistory();

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
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="login" icon={<LoginOutlined />} onClick={loginHandler}>
          Login
        </Menu.Item>
        <Menu.Item
          key="register"
          icon={<UserOutlined />}
          onClick={registerHandler}
        >
          Register
        </Menu.Item>

        <Menu.Item
          key="logout"
          icon={<LogoutOutlined />}
          onClick={logoutHandler}
        >
          Logout
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Navigation;
