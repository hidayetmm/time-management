import { NavLink, useLocation, useNavigate } from "react-router-dom";
import classes from "./Navigation.module.css";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { Menu } from "antd";
import {
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { logout, selectUser } from "features/auth/authSlice";
import { withRouter } from "hooks/withRouter";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("login", { replace: true });
  };

  return (
    <div className={classes.Navigation}>
      <Menu mode="horizontal" selectedKeys={[location.pathname]} theme="dark">
        {auth.user ? (
          <>
            <Menu.Item key="/records" icon={<EditOutlined />}>
              <NavLink to="/records">Records</NavLink>
            </Menu.Item>
            {auth.user.role === "ADMIN" ? (
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
};

export default withRouter(Navigation);
