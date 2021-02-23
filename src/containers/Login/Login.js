import { React, Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import classes from "./Login.module.css";

import AuthContext from "../../context/AuthContext";

import { Form, Input, Button } from "antd";

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
    status: null,
    redirect: null,
    loading: false,
  };

  submitHandler = (values) => {
    this.setState({ loading: true });

    let url = process.env.REACT_APP_BASE_URL;
    axios
      .post(url + "/auth/login", values)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        this.context.setUserDetails(response.data.data);
        this.setState({ redirect: true });
        this.setState({ loading: false });
        console.log(response);
        console.log(this.context.userDetails);
      })
      .catch((error) => {
        this.setState({ status: error.response.data.error.message });
        this.setState({ loading: false });
      });
  };

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/records" />;
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
          <p style={{ fontSize: "90%", color: "#3f51b5", textAlign: "center" }}>
            {this.state.status || "Please, enter your login information."}
          </p>
        </Form>
      </div>
    );
  }
}

Login.contextType = AuthContext;

export default Login;
