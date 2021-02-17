import { React, Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "antd/dist/antd.css";
import classes from "./Login.module.css";

import AuthContext from "../../context/AuthContext";

import { Form, Input, Button, Checkbox } from "antd";

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

class Login extends Component {
  state = {
    loggedUser: null,
    status: null,
    redirect: null,
    loading: false,
  };

  submitHandler = (values) => {
    this.setState({ loading: true });
    let baseUrl = "https://time-mgm-demo.getsandbox.com:443/auth/login";
    let data = values;
    axios
      .post(baseUrl, data)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        this.context.setUserDetails(response.data.data);
        this.setState({ redirect: "/management" });
      })
      .catch((error) => {
        this.setState({ status: error.response.data.error.message });
        this.setState({ loading: false });
      });
  };

  inputChange = (e) => {
    this.setState((prevState) => ({
      login: {
        ...prevState.login,
        [e.target.name]: e.target.value,
      },
    }));
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/management" />;
    }
    return (
      <div className={classes.Form}>
        <Form
          {...layout}
          name="basic"
          onFinish={(values) => this.submitHandler(values)}
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
            <Button
              type="primary"
              htmlType="submit"
              loading={this.state.loading}
            >
              Submit
            </Button>
          </Form.Item>
          {this.state.status ? (
            <p
              style={{ fontSize: "90%", color: "#3f51b5", textAlign: "center" }}
            >
              {this.state.status}
            </p>
          ) : (
            <p
              style={{ fontSize: "90%", color: "#3f51b5", textAlign: "center" }}
            >
              Please, enter your login information.
            </p>
          )}
        </Form>
      </div>
    );
  }
}

Login.contextType = AuthContext;

export default Login;
