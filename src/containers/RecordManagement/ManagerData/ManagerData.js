import React from "react";

import { Table, Space } from "antd";

const columns = [
  {
    title: "Work name",
    dataIndex: "workName",
    key: "name",
    render: (text) => <a href="/#">{text}</a>,
  },
  {
    title: "Hours",
    dataIndex: "workingHours",
    key: "hours",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Action",
    key: "action",
    render: (text) => (
      <Space size="middle">
        <a href="/#">Delete</a>
      </Space>
    ),
  },
];

function ManagerData(props) {
  return (
    <div>
      <Table columns={columns} dataSource={props.data} rowKey="id" />
    </div>
  );
}

export default ManagerData;
