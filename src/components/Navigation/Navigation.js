import { React, useContext } from "react";

import { NavLink } from "react-router-dom";

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

  const logoutHandler = () => {
    localStorage.clear();
    userValue.setUserDetails(null);
    history.replace("/login");
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
            <Menu.Item key="/records" icon={<EditOutlined />}>
              <NavLink to="/records">Records</NavLink>
            </Menu.Item>
            {userValue.userDetails.role === "ROLE_ADMIN" ? (
              <Menu.Item key="/users" icon={<UserOutlined />}>
                <NavLink to="/users">Users</NavLink>
              </Menu.Item>
            ) : null}
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
            <Menu.Item key="/login" icon={<LoginOutlined />}>
              <NavLink to="/login">Login</NavLink>
            </Menu.Item>
            <Menu.Item key="/registration" icon={<UserOutlined />}>
              <NavLink to="/registration">Register</NavLink>
            </Menu.Item>
          </>
        )}
      </Menu>
    </div>
  );
}

export default withRouter(Navigation);
