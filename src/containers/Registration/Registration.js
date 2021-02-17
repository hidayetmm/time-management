import { React, Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "antd/dist/antd.css";
import classes from "./Registration.module.css";

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

class Registration extends Component {
  state = {
    loggedUser: null,
    status: null,
    redirect: null,
  };

  submitHandler = (values) => {
    console.log(values);
    let baseUrl = "https://time-mgm-demo.getsandbox.com:443/users";
    let data = { ...values, role: "ROLE_USER" };
    axios
      .post(baseUrl, data)
      .then((response) => {
        console.log(response.data.data);
        this.setState({ redirect: "/management" });
        localStorage.setItem("user", JSON.stringify(response.data.data));
        this.context.setUserDetails(response.data.data);
      })
      .catch((error) => {
        this.setState({ status: error.response.data.error.message });
      });
  };

  inputChange = (e) => {
    this.setState((prevState) => ({
      login: {
        ...prevState.login,
        [e.target.name]: e.target.value,
      },
    }));

    console.log(this.state.login);
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
            <Button type="primary" htmlType="submit">
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
              Please, enter your username and password to register.
            </p>
          )}
        </Form>
      </div>
    );
  }
}

Registration.contextType = AuthContext;

export default Registration;
