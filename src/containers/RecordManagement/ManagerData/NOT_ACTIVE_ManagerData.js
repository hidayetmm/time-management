import React from "react";
import axios from "axios";

import { Table, Popconfirm, message, Space } from "antd";

function ManagerData(props) {
  const deleteHandler = (key) => {
    console.log(key);

    let url = "https://time-mgm-demo.getsandbox.com:443/records/" + key;
    axios
      .delete(url)
      .then((response) => {
        message.success("Successfully removed.");
        console.log(response.data.data);
        props.fetchProp();
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      key: "action",
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
          <a href="/#">Edit</a>

          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteHandler(record.id)}
          >
            <a href="/#">Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={props.data}
        rowKey="id"
        loading={props.loading}
        bordered
      />
    </div>
  );
}

export default ManagerData;
