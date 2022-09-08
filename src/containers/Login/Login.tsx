import { useState } from "react";
import { Navigate } from "react-router-dom";
import classes from "./Login.module.css";
import { Form, Input, Button } from "antd";
import { useLoginMutation } from "app/services/auth";
import { LoginCredentials } from "types";
import { useAppDispatch } from "app/hooks";
import { setCredentials } from "features/auth/authSlice";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Login = () => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<string>();
  const [redirect, setRedirect] = useState<boolean>();

  const [login, { isLoading, isSuccess, isError, error, data }] =
    useLoginMutation();

  const submitHandler = async (values: LoginCredentials) => {
    try {
      const response = await login(values).unwrap();
      console.log(response);
      dispatch(
        setCredentials({
          user: {
            id: "id",
            role: "ADMIN",
            username: "full name",
            accessToken: "token",
          },
        })
      );
    } catch (e) {
      console.log(e);
    }
    console.log("ERR: ", error);
  };

  if (redirect) {
    return <Navigate to="/records" replace />;
  }
  return (
    <div className={classes.Form}>
      <Form
        {...layout}
        name="basic"
        onFinish={(values) => submitHandler(values)}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
        <p style={{ fontSize: "90%", color: "#3f51b5", textAlign: "center" }}>
          {error && "data" in error
            ? error.data.message
            : "Please, enter your login information."}
        </p>
      </Form>
    </div>
  );
};

export default Login;
