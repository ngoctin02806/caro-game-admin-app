import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Redirect } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { view as Header } from "../../components2/header";
import { view as Sidebar } from "../../components2/sidebar";
import { view as Overview } from "./overview";
import { view as Topo } from "./topo";
import UserTable from "./UserTable";
import GameTable from "./GameTable";
import UserDetail from "./UserTable/UserDetail";
import styles from "./home.module.css";

import AuthContext from "../../contexts/authContext";

import AuthService from "../../service/auth-service";
import { BASE_API_URL } from "../../utils/constant";

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [admin, setAdmin] = useState({});

  const sidebarWidth = collapsed ? 80 : 256;
  const sidebarStyle = {
    flex: "0 0 " + sidebarWidth + "px",
    width: sidebarWidth + "px",
  };

  const currentAdminToken = AuthService.getCurrentUser();
  const expiredToken = AuthService.getExpired();

  useEffect(() => {
    console.log("reload");
    axios({
      method: "GET",
      url: `${BASE_API_URL}/api/v1/me/profile`,
      headers: AuthService.authHeader(),
    })
      .then((res) => {
        const profile = res.data.data.user;
        setAdmin(profile);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (currentAdminToken === null) return <Redirect to="/login" />;
  const now = new Date().getTime();
  if (expiredToken < now) {
    AuthService.logout();
    return <Redirect to="/login" />;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>Admin Home</title>
        <meta content="Admin Home" />
      </Helmet>
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          accessToken: currentAdminToken,
          profile: admin,
        }}
      >
        <div className="ant-layout ant-layout-has-sider">
          <div
            style={sidebarStyle}
            className="ant-layout-sider ant-layout-sider-dark"
          >
            <Sidebar collapsed={collapsed} />
          </div>
          <div className={`${styles["content-wrapper"]} ant-layout`}>
            <div className={`${styles.header} ant-layout-header`}>
              <Header collapsed={collapsed} setCollapsed={setCollapsed} />
            </div>
            <div className={`${styles.content} ant-layout-content`}>
              <Route path="/home/overview" component={Overview} />
              <Route
                path="/home/danh-sach-tai-khoan-nguoi-dung"
                component={UserTable}
              />
              <Route
                path="/home/danh-sach-lich-su-game"
                component={GameTable}
              />
              <Route path="/home/user/:userId" component={UserDetail} />
            </div>
          </div>
        </div>
      </AuthContext.Provider>
    </HelmetProvider>
  );
};

export default HomePage;
