import React, { Component } from "react";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";

import {
  Form,
  Input,
  Button,
  DatePicker,
  Space,
  InputNumber,
  message,
} from "antd";

class TimeManager extends Component {
  state = {
    loading: false,
    errorMessage: null,
  };

  onSubmitHandler = (values) => {
    this.setState({ loading: true });
    values.date = values.date.toDate().toLocaleDateString("en-CA");
    const modifiedValues = {
      ...values,
      userId: JSON.parse(localStorage.getItem("user")).id,
    };

    let url = "https://time-mgm-demo.getsandbox.com:443/records";
    axios
      .post(url, modifiedValues)
      .then((response) => {
        this.setState({ loading: false });
        message.success("Successfully added.");
        console.log(response.data.data);
        this.props.addHandler();
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
    const dateFormat = "YYYY/MM/DD";

    return (
      <div>
        <Form
          onFinish={(values) => this.onSubmitHandler(values)}
          scrollToFirstError
          onFinishFailed={this.warning}
        >
          <Space direction="horizontal" size={12}>
            <Form.Item
              name="workName"
              rules={[
                {
                  required: true,
                  message: false,
                },
              ]}
            >
              <Input placeholder="Work name" style={{ width: "20vw" }} />
            </Form.Item>
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: false,
                },
              ]}
            >
              <Input placeholder="Description" style={{ width: "20vw" }} />
            </Form.Item>
            <Form.Item
              name="date"
              rules={[
                {
                  required: true,
                  message: false,
                },
              ]}
            >
              <DatePicker
                format={dateFormat}
                disabledDate={this.disabledDate}
              />
            </Form.Item>
            <Form.Item
              name="workingHours"
              rules={[
                {
                  required: true,
                  message: false,
                },
              ]}
            >
              <InputNumber min={1} max={24} placeholder="Hours" type="number" />
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

TimeManager.contextType = AuthContext;

export default TimeManager;
