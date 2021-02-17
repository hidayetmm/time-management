import { React, useContext } from "react";

import classes from "./Navigation.module.css";
import AuthContext from "../../context/AuthContext";
import { useHistory, withRouter } from "react-router-dom";

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
        // style={{ background: "#17a2b8", color: "white" }}
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
