import React, { Component } from "react";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";

import { Form, Input, Button, Space, message, Select } from "antd";

const { Option } = Select;

class UserManager extends Component {
  state = {
    loading: false,
    errorMessage: null,
  };

  formRef = React.createRef();

  onSubmitHandler = (values) => {
    this.setState({ loading: true });
    const modifiedValues = {
      username: values.userName_userManager,
      password: values.password_userManager,
      role: values.role_userManager,
    };

    let url = "https://time-mgm-demo.getsandbox.com:443/users";
    axios
      .post(url, modifiedValues)
      .then((response) => {
        this.setState({ loading: false });
        message.success("Successfully added.");
        this.props.fetchProp();
        this.formRef.current.resetFields();
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error.response.data.error);
      });
  };

  warning = () => {
    message.warning("Please fill in all the required fields.");
  };

  disabledDate = (current) => {
    return current && current.valueOf() > Date.now();
  };

  render() {
    return (
      <div>
        <Form
          onFinish={(values) => this.onSubmitHandler(values)}
          scrollToFirstError
          onFinishFailed={this.warning}
          ref={this.formRef}
        >
          <Space direction="horizontal" size={12}>
            <Form.Item
              name="userName_userManager"
              rules={[
                {
                  required: true,
                  message: false,
                },
              ]}
            >
              <Input placeholder="User name" style={{ width: "20vw" }} />
            </Form.Item>
            <Form.Item
              name="role_userManager"
              rules={[
                {
                  required: true,
                  message: false,
                },
              ]}
            >
              <Select placeholder="User role" style={{ width: "10vw" }}>
                <Option value="ROLE_USER">Basic user</Option>
                <Option value="ROLE_ADMIN">Adminstrator</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="password_userManager"
              rules={[
                {
                  required: true,
                  message: false,
                },
              ]}
            >
              <Input
                type="password"
                placeholder="Password"
                style={{ width: "20vw" }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={this.state.loading}
              >
                Add
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </div>
    );
  }
}

UserManager.contextType = AuthContext;

export default UserManager;
