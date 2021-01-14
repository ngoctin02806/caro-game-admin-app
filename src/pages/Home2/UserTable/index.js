import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./styles.css";

import ProTable from "@ant-design/pro-table";
import {
  PageHeader,
  Avatar,
  Badge,
  Tag,
  Popconfirm,
  message,
  Form,
  Input,
  Button,
  Card,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

import { BASE_API_URL } from "../../../utils/constant";
import AuthService from "../../../service/auth-service";

const UserTable = () => {
  const actionRef = useRef();
  const [listUsers, setListUsers] = useState([]);
  const [pageIsChaged, setPageIsChaged] = useState(false);
  const [usernameSearchKey, setUsernameSearchKey] = useState("");
  const [emailSearchKey, setEmailSearchKey] = useState("");

  const routes = [
    {
      breadcrumbName: "Trang chủ",
    },
    {
      breadcrumbName: "Quản lý tài khoản",
    },
  ];

  const confirmUnblockUser = (userId) => {
    axios(`${BASE_API_URL}/api/v1/user/unblock/${userId}`, {
      method: "POST",
      headers: AuthService.authHeader(),
    })
      .then((res) => {
        if (res.status === 200) message.success("Unblock successfully");
        setPageIsChaged(true);
      })
      .catch((err) => {
        if (err.response) {
          message.error(err.response.data.errors[0].message);
        }
      });
  };

  const confirmBlockUser = (userId) => {
    axios(`${BASE_API_URL}/api/v1/user/block/${userId}`, {
      method: "POST",
      headers: AuthService.authHeader(),
    })
      .then((res) => {
        if (res.status === 200) message.success("Block successfully");
        setPageIsChaged(true);
      })
      .catch((err) => {
        if (err.response) {
          message.error(err.response.data.errors[0].message);
        }
      });
  };

  const handleSearchSubmit = async () => {
    const rs = await axios(
      `${BASE_API_URL}/api/v1/user/search-by-username-and-email`,
      {
        method: "POST",
        data: { username: usernameSearchKey, email: emailSearchKey },
        headers: AuthService.authHeader(),
      }
    );

    setListUsers(rs.data.data);
    return rs.data.data;
  };

  const usernameSearchOnChange = (e) => {
    setUsernameSearchKey(e.target.value);
  };

  const emailSearchOnChange = (e) => {
    setEmailSearchKey(e.target.value);
  };

  const columns = [
    {
      key: 1,
      title: "No.",
      dataIndex: "index",
      valueType: "indexBorder",
      width: "5%",
    },
    {
      key: 2,
      title: "Avatar",
      dataIndex: "avatar",
      ellipsis: true,
      render: (text, record) => {
        if (record.avatar !== null && record.avatar !== undefined)
          return <Avatar src={record.avatar} />;
        else return <Avatar icon={<UserOutlined />} />;
      },
      width: "7%",
    },
    {
      key: 3,
      title: "User ID",
      dataIndex: "_id",
      ellipsis: true,
      copyable: true,
    },
    {
      key: 4,
      title: "Name",
      dataIndex: "username",
      ellipsis: true,
    },
    { key: 5, title: "Email", dataIndex: "email", ellipsis: true },
    {
      key: 6,
      title: "Role",
      dataIndex: "role",
      ellipsis: true,
      width: "7%",
    },
    {
      key: 7,
      title: "Provider",
      dataIndex: "provider",
      ellipsis: true,
      width: "7%",
    },
    {
      key: 8,
      title: "Verify",
      dataIndex: "is_verified",
      ellipsis: true,
      width: "7%",
      render: (text, record) => {
        if (record.is_verified !== undefined)
          return (
            <Tag
              color={record.is_verified ? "success" : "red"}
              key={record.is_verified}
            >
              {record.is_verified ? "true" : "false"}
            </Tag>
          );
      },
    },
    {
      key: 9,
      title: "Blocked",
      dataIndex: "is_blocked",
      valueType: "select",
      width: "7%",
      render: (text, record) => {
        if (record.is_blocked !== undefined)
          return (
            <Tag
              color={record.is_blocked ? "red" : "success"}
              key={record.is_blocked}
            >
              {record.is_blocked ? "Blocked" : "Active"}
            </Tag>
          );
        else {
          return (
            <Tag color="success" key={false}>
              Active
            </Tag>
          );
        }
      },
    },
    {
      key: 10,
      title: "Online State",
      dataIndex: "online_state",
      width: "10%",
      render: (text, record) => {
        if (record.online_state !== undefined) {
          return record.online_state === false ? (
            <Badge status="default" text="Offline" />
          ) : (
            <Badge status="processing" text="Online" color="green" />
          );
        }
      },
    },
    {
      key: 11,
      title: "Point",
      dataIndex: "point",
      ellipsis: true,
      width: "7%",
    },
    {
      key: 12,
      title: "Action",
      valueType: "option",
      render: (_, row, index, action) => [
        (row.is_blocked === false || row.is_blocked === undefined) && (
          <Popconfirm
            key={1}
            placement="top"
            title="Khóa tài khoản này ?"
            onConfirm={() => confirmBlockUser(row._id)}
            okText="Yes"
            cancelText="No"
          >
            <a>Khóa</a>
          </Popconfirm>
        ),
        ,
        row.is_blocked === true && (
          <Popconfirm
            key={2}
            placement="top"
            title="Mở khóa tài khoản này ?"
            onConfirm={() => confirmUnblockUser(row._id)}
            okText="Yes"
            cancelText="No"
          >
            {" "}
            <a>Mở khóa</a>
          </Popconfirm>
        ),
        <Link to={"/home/user/" + row._id}>
          <a>Chi tiết</a>
        </Link>,
      ],
    },
  ];

  useEffect(() => {
    console.log("user table reload");
    setPageIsChaged(false);
    if (pageIsChaged === false) {
      axios({
        method: "get",
        url: `${BASE_API_URL}/api/v1/user/get-all`,
        headers: AuthService.authHeader(),
      })
        .then((res) => {
          setListUsers(res.data.data);
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [, pageIsChaged]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Quản lý tài khoản</title>
      </Helmet>
      <>
        <PageHeader
          className="site-page-header"
          title="Danh sách tài khoản người dùng"
          breadcrumb={{ routes }}
          subTitle=""
        />
        <Card>
          <Form
            className="search-form"
            name="customized_form_controls"
            layout="inline"
            onFinish={handleSearchSubmit}
          >
            <Form.Item name="name" label="Name">
              <Input
                type="text"
                placeholder="Nhập tên người dùng"
                value={usernameSearchKey}
                onChange={(e) => usernameSearchOnChange(e)}
                style={{ width: "auto" }}
              />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input
                type="text"
                placeholder="Nhập email người dùng"
                value={emailSearchKey}
                onChange={(e) => emailSearchOnChange(e)}
                style={{ width: "auto" }}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Tìm kiếm
              </Button>
            </Form.Item>
          </Form>
          <ProTable
            columns={columns}
            key="user"
            actionRef={actionRef}
            editable={{
              type: "multiple",
            }}
            rowKey="id"
            search={false}
            pagination={{
              pageSize: 5,
              showTotal: (total, range) => (
                <div>{`Đang hiện ${range[0]}-${range[1]} trên ${total} tài khoản`}</div>
              ),
            }}
            dateFormatter="string"
            dataSource={listUsers}
          />
        </Card>
      </>
    </HelmetProvider>
  );
};

export default UserTable;
