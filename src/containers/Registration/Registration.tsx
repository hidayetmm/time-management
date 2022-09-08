import { Navigate } from "react-router-dom";
import classes from "./Registration.module.css";
import { Form, Input, Button } from "antd";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectUser, setCredentials } from "features/auth/authSlice";
import { useSignupMutation } from "app/services/auth";
import { LoginCredentials } from "types";

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

const Registration = () => {
  const auth = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [signup, { isLoading, isSuccess, isError, error, data }] =
    useSignupMutation();

  const submitHandler = async (values: LoginCredentials) => {
    try {
      const response = await signup(values).unwrap();
      dispatch(setCredentials({ user: response }));
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  if (!!auth.user) {
    return <Navigate to="/records" />;
  }

  return (
    <div className={classes.Form}>
      <Form
        {...layout}
        name="registration"
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
          {(error && "data" in error) ||
            "Please, enter your username and password to register."}
        </p>
      </Form>
    </div>
  );
};

export default Registration;
