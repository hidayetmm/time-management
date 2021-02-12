import React from "react";

import { Input, Button } from "antd";
import { DatePicker, Space } from "antd";
import { Select } from "antd";

const { RangePicker } = DatePicker;

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function TimeManager(props) {
  return (
    <div>
      <Space direction="horizontal" size={12}>
        <Input placeholder="Enter work name" style={{ width: "300px" }} />
        <Select mode="tags" style={{ width: "80px" }} placeholder="Tags">
          {children}
        </Select>
        <RangePicker showTime={{ format: "HH:mm" }} format="YYYY-MM-DD HH:mm" />
        <Button type="primary">Add</Button>
      </Space>
    </div>
  );
}

export default TimeManager;
