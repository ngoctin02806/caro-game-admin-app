import React from "react";
import { Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import * as LocalStorage from "../../utils/localstorage";
import styles from "./header.module.css";

import {
  SettingOutlined,
  PoweroffOutlined,
  UserOutlined,
  DownOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

import AuthService from "../../service/auth-service";

const menu = (
  <Menu>
    <Menu.Item key="1">
      <Link to="/home/setting">
        <SettingOutlined />
        &nbsp;Setting
      </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item
      key="2"
      onClick={() => {
        AuthService.logout();
        window.location.reload();
      }}
    >
      <Link to="/login">
        <PoweroffOutlined />
        &nbsp;Logout
      </Link>
    </Menu.Item>
  </Menu>
);

const Header = ({ collapsed, setCollapsed }) => {
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
            {LocalStorage.get("TA-username")}
            <DownOutlined />
          </span>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
