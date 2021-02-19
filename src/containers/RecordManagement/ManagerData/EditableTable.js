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
} from "antd";

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
    // try {
    //   const row = await form.validateFields();
    //   const newData = [...data];
    //   const index = newData.findIndex((item) => key === item.key);
    //   if (index > -1) {
    //     const item = newData[index];
    //     newData.splice(index, 1, { ...item, ...row });
    //     setData(newData);
    //     setEditingKey("");
    //     console.log(newData);
    //   } else {
    //     newData.push(row);
    //     setData(newData);
    //     setEditingKey("");
    //     console.log(row);
    //   }
    // } catch (errInfo) {
    //   console.log("Validate Failed:", errInfo);
    // }

    const row = await form.validateFields();
    let url = "https://time-mgm-demo.getsandbox.com:443/records/" + record.id;
    axios
      .put(url, row)
      .then((response) => {
        setEditingKey("");

        // this.setState({ loading: false });
        message.success("Successfully updated.");
        console.log(response);
        props.fetchProp();
      })
      .catch((error) => {
        setEditingKey("");

        // this.setState({ loading: false });
        console.log(error);
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
      render: (text) => <a href="/#">{text}</a>,
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
      width: "10%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="#"
              onClick={() => save(record)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a href="/#">Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Space>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => deleteHandler(record.id)}
            >
              <a href="/#">Delete</a>
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
        rowKey="id"
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={props.data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default EditableTable;
