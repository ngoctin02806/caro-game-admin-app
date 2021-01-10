import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import ProTable from "@ant-design/pro-table";
import {
  Avatar,
  Badge,
  Tag,
  Popconfirm,
  message,
  Form,
  Input,
  Button,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

import { BASE_API_URL } from "../../../utils/constant";
import AuthService from "../../../service/auth-service";

const UserTable = () => {
  const actionRef = useRef();
  const [listGames, setListGames] = useState([]);
  const [pageIsChaged, setPageIsChaged] = useState(false);

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
      title: "Game ID",
      dataIndex: "_id",
      ellipsis: true,
      copyable: true,
    },
    {
      key: 3,
      title: "Create By",
      dataIndex: "create_by",
      ellipsis: true,
      render: (tex, record, index) => {
        if (record.created_by.length === 0) return null;
        else
          return (
            <Link to={"/home/user/" + record.created_by[0]._id}>
              {record.created_by[0].username}
            </Link>
          );
      },
    },
    {
      key: 4,
      title: "Created At",
      dataIndex: "create_at",
      ellipsis: true,
      render: (tex, record, index) => {
        const date = new Date(record.created_at);
        return date.toLocaleDateString("en-GB");
      },
    },
    {
      key: 5,
      title: "Player 1",
      dataIndex: "players",
      ellipsis: true,
      render: (tex, record, index) => {
        return (
          <Link to={"/home/user/" + record.players[0]._id}>
            {record.players[0].username}
          </Link>
        );
      },
    },
    {
      key: 6,
      title: "Player 2",
      dataIndex: "players[1].username",
      ellipsis: true,
      render: (tex, record, index) => {
        return (
          <Link to={"/home/user/" + record.players[1]._id}>
            {record.players[1].username}
          </Link>
        );
      },
    },
    {
      key: 7,
      title: "Winner",
      dataIndex: "winner",
      ellipsis: true,
      render: (tex, record, index) => {
        if (record.winner.length === 0) return null;
        else
          return (
            <Link to={"/home/user/" + record.winner[0]._id}>
              {record.winner[0].username}
            </Link>
          );
      },
    },
    {
      key: 8,
      title: "Total Steps",
      dataIndex: "steps",
      ellipsis: true,
      render: (tex, record, index) => {
        return record.steps.length;
      },
    },
    {
      key: 9,
      title: "Action",
      valueType: "option",
      render: (_, row, index, action) => [<a>Chat Detail</a>],
    },
  ];

  useEffect(() => {
    console.log("game table reload");
    setPageIsChaged(false);
    if (pageIsChaged === false) {
      axios({
        method: "get",
        url: `${BASE_API_URL}/api/v1/game/get-all`,
        headers: AuthService.authHeader(),
      })
        .then((res) => {
          setListGames(res.data.data.reverse());
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [, pageIsChaged]);

  return (
    <>
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
            <div>{`Showing ${range[0]}-${range[1]} of ${total} total items`}</div>
          ),
        }}
        dateFormatter="string"
        dataSource={listGames}
      />
    </>
  );
};

export default UserTable;
