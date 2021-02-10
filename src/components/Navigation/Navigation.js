import { React, useContext } from "react";

import AuthContext from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";

const { SubMenu } = Menu;

function Navigation() {
  const userValue = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.clear();
    userValue.setUserDetails(null);
    history.replace("/login");
  };

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="login" icon={<MailOutlined />}>
          Login
        </Menu.Item>
        <Menu.Item key="register" icon={<MailOutlined />}>
          Register
        </Menu.Item>

        <Menu.Item key="mail" icon={<MailOutlined />} onClick={logoutHandler}>
          Logout
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Navigation;
