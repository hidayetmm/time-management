import { React, useContext } from "react";

import AuthContext from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

import Menu from "antd/lib/menu";
import {
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
  EditOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";

function Navigation() {
  const userValue = useContext(AuthContext);
  const history = useHistory();

  const managementHandler = () => {
    history.replace("/management");
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
    <div>
      <Menu mode="horizontal" defaultSelectedKeys={[history.location.pathname]}>
        {userValue.userDetails ? (
          <>
            <Menu.Item
              key="/management"
              icon={<EditOutlined />}
              onClick={managementHandler}
            >
              Management
            </Menu.Item>
            <Menu.Item
              key="/records"
              icon={<HistoryOutlined />}
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

export default Navigation;
