import React, { Component } from "react";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";

import { Form, Input, Button, DatePicker, InputNumber, message } from "antd";

class TimeManager extends Component {
  state = {
    loading: false,
    errorMessage: null,
  };

  formRef = React.createRef();

  onSubmitHandler = (values) => {
    this.setState({ loading: true });

    const modifiedValues = {
      workName: values.workName_timeManager,
      description: values.description_timeManager,
      date: values.date_timeManager.toDate().toLocaleDateString("en-CA"),
      workingHours: values.workingHours_timeManager,
      userId: this.context.userDetails.id,
    };

    let url = process.env.REACT_APP_BASE_URL;
    axios
      .post(url + "/records", modifiedValues)
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
    const dateFormat = "YYYY-MM-DD";

    return (
      <div>
        <Form
          onFinish={(values) => this.onSubmitHandler(values)}
          scrollToFirstError
          onFinishFailed={this.warning}
          ref={this.formRef}
          layout="inline"
          style={{ paddingBottom: "2%" }}
        >
          <Form.Item
            name="workName_timeManager"
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
            name="description_timeManager"
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
            name="date_timeManager"
            rules={[
              {
                required: true,
                message: false,
              },
            ]}
          >
            <DatePicker format={dateFormat} disabledDate={this.disabledDate} />
          </Form.Item>
          <Form.Item
            name="workingHours_timeManager"
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
        </Form>
      </div>
    );
  }
}

TimeManager.contextType = AuthContext;

export default TimeManager;
