import {
  MailOutlined,
  HomeOutlined,
  ContactsOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Card, Col, Divider, Row, Tag } from "antd";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GridContent } from "@ant-design/pro-layout";
import Articles from "./components/Articles";
import "./styles.css";

import EmptyAvatar from "../../../../public/images/user.png";

import { BASE_API_URL } from "../../../../utils/constant";
import AuthService from "../../../../service/auth-service";

const operationTabList = [
  {
    key: "articles",
    tab: (
      <span>
        Games Played{" "}
        <span
          style={{
            fontSize: 14,
          }}
        >
          (8)
        </span>
      </span>
    ),
  },
];

const UserDetail = (props) => {
  const [tabKey, setTabKey] = useState("articles");
  const [currentUser, setCurrentUser] = useState({});
  const dataLoading = !(currentUser && Object.keys(currentUser).length);
  const { userId } = useParams();

  useEffect(() => {
    axios(`${BASE_API_URL}/api/v1/user/profile/${userId}`, {
      method: "GET",
      headers: AuthService.authHeader(),
    })
      .then((res) => {
        console.log(res.data);
        setCurrentUser(res.data.data);
      })
      .catch((err) => console.log(err.response.data.message));
  }, [userId]);

  const onTabChange = (key) => {
    setTabKey(key);
  };

  console.log("user detail reload");
  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card
            bordered={false}
            style={{
              marginBottom: 24,
            }}
            loading={dataLoading}
          >
            {!dataLoading && (
              <div>
                <div className="avatarHolder">
                  <img
                    alt=""
                    src={currentUser.avatar ? currentUser.avatar : EmptyAvatar}
                  />
                  <div className="name">{currentUser.username}</div>
                  <div>{currentUser._id}</div>
                </div>
                <div className="detail">
                  <p>
                    <MailOutlined
                      style={{
                        marginRight: 8,
                      }}
                    />
                    Email: {currentUser.email}
                  </p>
                  <p>
                    <ContactsOutlined
                      style={{
                        marginRight: 8,
                      }}
                    />
                    Role: {currentUser.role}
                  </p>
                  <p>
                    <ThunderboltOutlined
                      style={{
                        marginRight: 8,
                      }}
                    />
                    Point: {currentUser.point}
                  </p>
                  <p>
                    <HomeOutlined
                      style={{
                        marginRight: 8,
                      }}
                    />
                    Provider: {currentUser.provider}
                  </p>
                </div>
                <Divider dashed />
                <div className="tags">
                  <div className="tagsTitle">Status</div>
                  {currentUser.is_blocked ? (
                    <Tag key="1" icon={<CloseCircleOutlined />} color="error">
                      Blocked
                    </Tag>
                  ) : (
                    <Tag key="1" icon={<CheckCircleOutlined />} color="success">
                      Actived
                    </Tag>
                  )}
                  {currentUser.is_verified ? (
                    <Tag key="2" icon={<CheckCircleOutlined />} color="success">
                      Verified
                    </Tag>
                  ) : (
                    <Tag key="2" icon={<CloseCircleOutlined />} color="error">
                      Not Verified
                    </Tag>
                  )}

                  {currentUser.is_topup && (
                    <Tag key="3" icon={<CloseCircleOutlined />} color="error">
                      Topup
                    </Tag>
                  )}
                </div>
              </div>
            )}
          </Card>
        </Col>
        <Col lg={17} md={24}>
          <Card
            className="tabsCard"
            bordered={false}
            tabList={operationTabList}
            activeTabKey={tabKey}
            onTabChange={onTabChange}
          >
            <Articles />
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};

export default UserDetail;
