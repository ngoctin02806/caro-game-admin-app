import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";

import "./styles.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Row, Col } from "antd";
import { Form, Input, Button, Checkbox } from "antd";
import { Alert } from "antd";

import logo from "../../public/images/logo.svg";
import Banner from "../../public/images/home-banner.png";

import { BASE_API_URL } from "../../utils/constant";
import AuthService from "../../service/auth-service";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Login = (props) => {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [msgErr, setMsgErr] = useState("");

  const onFinish = (values) => {
    axios({
      method: "post",
      url: `${BASE_API_URL}/api/v1/me/login`,
      data: {
        email: values.email,
        password: values.password,
      },
    })
      .then((res) => {
        const userInfo = res.data.data;
        if (userInfo.user.role === "ADMIN") {
          setUser(userInfo);
          setLoggedIn(true);
          localStorage.setItem("accessToken", userInfo.auth.token);
          localStorage.setItem("expiredTokenDate", userInfo.auth.expire_in);
          history.push("/home/overview");
          window.location.reload();
        } else {
          setIsErr(true);
          setMsgErr("This user is not admin");
        }
      })
      .catch((err) => {
        setIsErr(true);
        setMsgErr(err.response.data.errors[0].message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const currentAuthToken = AuthService.getCurrentUser();
  if (currentAuthToken !== "") return <Redirect to="/home/overview" />;

  return (
    <HelmetProvider>
      <Helmet>
        <title>Admin Login</title>
        <meta name="description" content="Admin Login" />
      </Helmet>
      <div className="container">
        <Row className="card">
          <Col span={12}>
            <img alt="logo" className="banner" src={Banner} />
          </Col>
          <Col span={12}>
            <div className="content">
              <div className="top">
                <div className="header">
                  <Link to="/">
                    <img alt="logo" className="logo" src={logo} />
                    <span className="title">Caro Online Game</span>
                  </Link>
                </div>
                <div className="desc">Login with Admin role</div>
              </div>
              <div className="form">
                <Form
                  {...layout}
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  {isErr && (
                    <Form.Item {...tailLayout}>
                      <Alert message={msgErr} type="error" />
                    </Form.Item>
                  )}

                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                      Log in
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </HelmetProvider>
  );
};

export default Login;
