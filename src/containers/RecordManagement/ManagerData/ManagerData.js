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
} from "antd";
import { FormOutlined, DeleteOutlined, FilterFilled } from "@ant-design/icons";

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
  if (dataIndex === "workingHours") {
    inputNode = <InputNumber style={{ width: "100%" }} />;
  } else if (dataIndex === "date") {
    inputNode = <DatePicker format={dateFormat} disabledDate={disabledDate} />;
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

const ManagerData = (props) => {
  const userValue = useContext(AuthContext);

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const filtered = props.filtered;

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      workName: record.workName,
      workingHours: record.workingHours,
      description: record.description,
      date: moment(record.date),
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

    let url = process.env.REACT_APP_BASE_URL;
    axios
      .put(url + "/records/" + record.id, modifiedValues)
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
    let url = "https://time-mgm-demo.getsandbox.com:443/records/" + key;
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
      title: "Work name",
      dataIndex: "workName",
      key: "name",
      editable: true,
      width: "20%",
      render:
        userValue.userDetails.role === "ROLE_USER"
          ? (text) => <Typography.Link>{text}</Typography.Link>
          : null,
    },
    {
      title: "Hours",
      dataIndex: "workingHours",
      key: "hours",
      editable: true,
      width: "8%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      editable: true,
      width: "35%",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      editable: true,
      width: "15%",
      filterDropdown: ({ confirm }) => (
        <Space direction="horizontal" style={{ padding: 10 }} size="small">
          <RangePicker
            // style={{ marginRight: "10px" }}
            format={dateFormat}
            onChange={(dates) => props.setRange(dates)}
            disabledDate={disabledDate}
          />

          <Button
            type="primary"
            onClick={() => props.filter(confirm)}
            // icon="search"
            size="middle"
            // style={{ width: "20%", marginRight: 8 }}
          >
            Filter
          </Button>
          <Button
            onClick={props.fetchProp}
            size="middle"
            // style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      ),
      filterIcon: () => (
        <FilterFilled style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
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

  if (userValue.userDetails.role === "ROLE_ADMIN") {
    columns.unshift({
      title: "User name",
      dataIndex: ["user", "username"],
      key: "userName",
      editable: true,
      width: "20%",
      render: (text) => <Typography.Link>{text}</Typography.Link>,
    });
  }

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

export default ManagerData;
