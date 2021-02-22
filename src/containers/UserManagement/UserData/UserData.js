import React, { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";
import moment from "moment";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  message,
  Space,
  Divider,
  DatePicker,
  Button,
  Select,
} from "antd";
import { FormOutlined, DeleteOutlined, FilterFilled } from "@ant-design/icons";

const { Option } = Select;
const { RangePicker } = DatePicker;

const dateFormat = "YYYY-MM-DD";

const disabledDate = (current) => {
  return current && current.valueOf() > Date.now();
};

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  let inputNode = null;
  if (dataIndex === "role") {
    console.log(record);
    inputNode = (
      <Select>
        <Option value="ROLE_USER">Basic user</Option>
        <Option value="ROLE_ADMIN">Admin</Option>
      </Select>
    );
  } else {
    inputNode = <Input />;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const UserData = (props) => {
  const userValue = useContext(AuthContext);

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const filtered = props.filtered;

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      id: record.id,
      username: record.username,
      role: record.role,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (record) => {
    const hide = message.loading("Updating..", 0);
    const row = await form.validateFields();
    const modifiedValues = {
      ...row,
      date: row.date.toDate().toLocaleDateString("en-CA"),
    };

    let url = "https://time-mgm-demo.getsandbox.com:443/records/" + record.id;
    axios
      .put(url, modifiedValues)
      .then((response) => {
        hide();
        setEditingKey("");
        props.fetchProp();
        message.success("Successfully updated.");
      })
      .catch((error) => {
        hide();
        setEditingKey("");
        console.log(error);
        message.error("Something went wrong.");
      });
  };

  const deleteHandler = (key) => {
    let url = "https://time-mgm-demo.getsandbox.com:443/users/" + key;
    axios
      .delete(url)
      .then((response) => {
        message.success("Successfully removed.");
        props.fetchProp();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "role",
      editable: false,
      width: "5%",
    },
    {
      title: "User name",
      dataIndex: "username",
      key: "userName",
      editable: true,
      width: "20%",
      render: (text) => <Typography.Link>{text}</Typography.Link>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      editable: true,
      width: "35%",
      render: (text) => (text === "ROLE_ADMIN" ? "Adminstrator" : "Basic user"),
    },
    // {
    //   title: "Working hours",
    //   dataIndex: "workingHours",
    //   key: "hours",
    //   editable: true,
    //   width: "8%",
    // },
    {
      dataIndex: "operation",
      width: "5%",
      render: (_, record) => {
        const editable = isEditing(record);
        console.log(record);
        return editable ? (
          <Space>
            <Typography.Link onClick={() => save(record)}>Save</Typography.Link>
            <Divider type="vertical" />
            <Typography.Link onClick={cancel}>Cancel</Typography.Link>
          </Space>
        ) : (
          <Space size="small">
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              <FormOutlined style={{ fontSize: "1.1rem" }} />
            </Typography.Link>
            <Divider type="vertical" />
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => deleteHandler(record.id)}
            >
              <Typography.Link>
                <DeleteOutlined style={{ fontSize: "1.1rem" }} />
              </Typography.Link>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "workingHours" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        key: col.key,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        dataSource={props.data}
        columns={mergedColumns}
        rowKey="id"
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        loading={props.loading}
        bordered
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default UserData;
