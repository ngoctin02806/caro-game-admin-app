import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { view as Header } from "../../components2/header";
import { view as Sidebar } from "../../components2/sidebar";
import { view as Overview } from "./overview";
import { view as Topo } from "./topo";
import styles from "./home.module.css";

import AuthService from "../../service/auth-service";

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 80 : 256;
  const sidebarStyle = {
    flex: "0 0 " + sidebarWidth + "px",
    width: sidebarWidth + "px",
  };

  if (AuthService.getCurrentUser() === null) return <Redirect to="/login" />;

  return (
    <HelmetProvider>
      <Helmet>
        <title>Admin Home</title>
        <meta content="Admin Home" />
      </Helmet>
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
            <Route path="/home/topo" component={Topo} />
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default HomePage;
