import React from "react";

import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

function TimeManager(props) {
  return (
    <Space direction="vertical" size={12}>
      <RangePicker showTime={{ format: "HH:mm" }} format="YYYY-MM-DD HH:mm" />
    </Space>
  );
}

export default TimeManager;
