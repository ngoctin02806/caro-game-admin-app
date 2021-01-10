import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, Avatar } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { UserOutlined } from "@ant-design/icons";

import "./style.css";

import { BASE_API_URL } from "../../../../utils/constant";
import AuthService from "../../../../service/auth-service";

const msgTimeFormat = (time) => {
  const dateObject = new Date(time);
  const weekday = dateObject.toLocaleString("en-US", { weekday: "long" });
  const hour = dateObject.getHours();
  const min = dateObject.getMinutes();

  const rs = weekday.slice(0, 3) + ", " + hour + ":" + min;
  return rs;
};

const MessageItem = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios(
      `${BASE_API_URL}/api/v1/conversation/game/${props.gameId}/messages/`,
      {
        method: "GET",
        headers: AuthService.authHeader(),
      }
    )
      .then((res) => {
        setData(res.data.messages);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setData([]);
      });
  }, [props.gameId]);

  return (
    <div className="demo-infinite-container">
      <InfiniteScroll initialLoad={true} pageStart={0} loadMore={() => {}}>
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item._id}>
              <List.Item.Meta
                avatar={
                  item.created_by.length > 0 ? (
                    item.created_by[0].avatar !== null &&
                    item.created_by[0].avatar !== undefined ? (
                      <Avatar src={item.created_by[0].avatar} />
                    ) : (
                      <Avatar icon={<UserOutlined />} />
                    )
                  ) : (
                    <Avatar icon={<UserOutlined />} />
                  )
                }
                title={
                  <a href="https://ant.design">
                    {item.created_by.length > 0
                      ? item.created_by[0].username
                      : "null"}
                  </a>
                }
                description={item.content}
              />
              <div>{msgTimeFormat(item.created_at)}</div>
            </List.Item>
          )}
        ></List>
      </InfiniteScroll>
    </div>
  );
};

export default MessageItem;
