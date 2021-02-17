import { React, useState, useEffect } from "react";
import axios from "axios";

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

function ManagerData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = "https://time-mgm-demo.getsandbox.com:443/records";
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
}

export default ManagerData;
