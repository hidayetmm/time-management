import { React, Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "antd/dist/antd.css";

import AuthContext from "../../context/AuthContext";

// import { FormControl, Button, TextField } from "@material-ui/core";
import { Form, Input, Button, Checkbox } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
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
    // login: {
    //   username: "",
    //   password: "",
    // },
    loggedUser: null,
    status: null,
    redirect: null,
  };

  submitHandler = (values) => {
    console.log(values);
    let baseUrl = "https://time-mgm-demo.getsandbox.com:443/auth/login";
    let data = values;
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
      <div>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
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

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
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

{
  /* {this.state.status ? (
  <p style={{ fontSize: "90%", color: "#3f51b5" }}>
    {this.state.status}
  </p>
) : (
  <p style={{ fontSize: "90%", color: "#3f51b5" }}>
    Please, enter your login information.
  </p>
)} */
}
