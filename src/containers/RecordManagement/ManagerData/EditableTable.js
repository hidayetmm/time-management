import React, { useState } from "react";
import axios from "axios";
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
} from "antd";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";

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
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
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

const EditableTable = (props) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (record) => {
    const hide = message.loading("Updating..", 0);
    const row = await form.validateFields();
    let url = "https://time-mgm-demo.getsandbox.com:443/records/" + record.id;
    axios
      .put(url, row)
      .then((response) => {
        hide();
        setEditingKey("");
        console.log(response);
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
      editable: true,
      render: (text) => <Typography.Link>{text}</Typography.Link>,
    },
    {
      title: "Hours",
      dataIndex: "workingHours",
      key: "hours",
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      editable: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      editable: true,
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
        inputType: col.dataIndex === "date" ? "date" : "text",
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

export default EditableTable;
