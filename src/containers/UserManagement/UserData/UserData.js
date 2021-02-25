import React, { useState } from "react";
import axios from "axios";
import {
  Table,
  Input,
  Popconfirm,
  Form,
  Typography,
  message,
  Space,
  Divider,
  Select,
} from "antd";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

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
    inputNode = (
      <Select>
        <Option value="ROLE_USER">Basic user</Option>
        <Option value="ROLE_ADMIN">Adminstrator</Option>
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
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

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

    let url = process.env.REACT_APP_BASE_URL;
    axios
      .put(url + "/users/" + record.id, row)
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
    let url = process.env.REACT_APP_BASE_URL;
    axios
      .delete(url + "/users/" + key)
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
      width: "30%",
      render: (text) => (text === "ROLE_ADMIN" ? "Adminstrator" : "Basic user"),
    },
    {
      dataIndex: "operation",
      width: "5%",
      render: (_, record) => {
        const editable = isEditing(record);
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
          defaultPageSize: 5,
        }}
      />
    </Form>
  );
};

export default UserData;
