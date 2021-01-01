import React, { useContext } from "react";
import { Dropdown, Menu } from "antd";
import styles from "./header.module.css";

import {
  SettingOutlined,
  PoweroffOutlined,
  UserOutlined,
  DownOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

import AuthContext from "../../contexts/authContext";

import AuthService from "../../service/auth-service";

const menu = (
  <Menu>
    <Menu.Item key="1">
      <SettingOutlined />
      &nbsp;Setting
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item
      key="2"
      onClick={() => {
        AuthService.logout();
        window.location.reload();
      }}
    >
      <PoweroffOutlined />
      &nbsp;Logout
    </Menu.Item>
  </Menu>
);

const Header = ({ collapsed, setCollapsed }) => {
  const userContext = useContext(AuthContext);
  return (
    <div className={styles["header-wrapper"]}>
      <span
        className={styles["header-collapsed"]}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </span>
      <div className={styles["header-user-info"]}>
        <Dropdown overlay={menu} placement="bottomRight">
          <span className={styles["header-dropdown-link"]}>
            <UserOutlined />
            {userContext.profile.username}
            <DownOutlined />
          </span>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
