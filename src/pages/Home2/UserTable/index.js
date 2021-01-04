import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

import ProTable from "@ant-design/pro-table";

import { BASE_API_URL } from "../../../utils/constant";
import AuthService from "../../../service/auth-service";

const columns = [
  {
    key: 1,
    dataIndex: "index",
    valueType: "indexBorder",

    width: 48,
  },
  { key: 2, title: "Avatar", dataIndex: "avatar", ellipsis: true },
  { key: 3, title: "User ID", dataIndex: "_id", ellipsis: true },
  { key: 4, title: "Email", dataIndex: "email", ellipsis: true },
  { key: 5, title: "Provider", dataIndex: "provider", ellipsis: true },
  {
    key: 6,
    title: "Verify",
    dataIndex: "is_verified",
    ellipsis: true,
  },
  { key: 7, title: "Point", dataIndex: "point", ellipsis: true },
  {
    key: 8,
    title: "Online State",
    dataIndex: "online_state",
    ellipsis: true,
  },
];

const UserTable = () => {
  const actionRef = useRef();
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${BASE_API_URL}/api/v1/user/get-all`,
      headers: AuthService.authHeader(),
    })
      .then((res) => {
        let temp = res.data.data;
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].is_verified !== undefined)
            temp[i].is_verified = temp[i].is_verified.toString();
          if (temp[i].online_state !== undefined)
            temp[i].online_state = temp[i].online_state.toString();
        }
        setListUsers({ data: temp });
        console.log(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ProTable
      columns={columns}
      key="user"
      actionRef={actionRef}
      request={async () => listUsers}
      editable={{
        type: "multiple",
      }}
      rowKey="id"
      search={{
        labelWidth: "auto",
      }}
      pagination={{
        pageSize: 5,
        showTotal: (total, range) => (
          <div>{`Showing ${range[0]}-${range[1]} of ${total} total items`}</div>
        ),
      }}
      dateFormatter="string"
    />
  );
};

export default UserTable;
