import { NavLink, useLocation, useNavigate } from "react-router-dom";
import classes from "./Navigation.module.css";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { Menu, MenuProps } from "antd";
import {
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { setCredentials, selectUser } from "features/auth/authSlice";
import { withRouter } from "hooks/withRouter";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(setCredentials({ user: null }));
    navigate("login", { replace: true });
  };

  const loggedInMenuItems: MenuProps["items"] = [
    {
      key: "/records",
      icon: <EditOutlined />,
      label: "Records",
    },
    auth.user?.role === "ADMIN"
      ? {
          key: "/users",
          icon: <UserOutlined />,
          label: "Users",
        }
      : null,
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => logoutHandler(),
    },
  ];

  const loggedOutMenuItems = [
    {
      key: "/login",
      icon: <LoginOutlined />,
      label: "Login",
      onClick: () => navigate("login"),
    },
    {
      key: "/registration",
      icon: <UserOutlined />,
      label: "Register",
      onClick: () => navigate("registration"),
    },
  ];

  return (
    <div className={classes.Navigation}>
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        theme="dark"
        items={auth.user ? loggedInMenuItems : loggedOutMenuItems}
      />
    </div>
  );
};

export default withRouter(Navigation);
