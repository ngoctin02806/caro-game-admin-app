import React, { useState } from "react";
import data from "./data";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  AreaChartOutlined,
  SettingOutlined,
  TrophyOutlined,
  DollarCircleOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import styles from "./sidebar.module.css";
import logo from "../../assets/images/logo.svg";
const { SubMenu } = Menu;

const Sidebar = ({ collapsed }) => {
  const [current, setCurrent] = useState("overview");

  return (
    <div className="ant-layout-sider-children">
      <div className={styles.logo}>
        <a href="/">
          <img src={logo} alt="logo" />
          <h1>React Easy Start</h1>
        </a>
      </div>
      <Menu
        theme="dark"
        onClick={(e) => setCurrent(e.key)}
        style={{ padding: "16px 0", width: "100%" }}
        defaultOpenKeys={["overview", "sub-res", "sub-other"]}
        selectedKeys={[current]}
        mode="inline"
        inlineCollapsed={collapsed}
      >
        {data.map((item) => {
          if (item.children instanceof Array) {
            return (
              <SubMenu
                key={item.key}
                title={
                  <span>
                    {item.icon === "home" && <HomeOutlined />}
                    {item.icon === "user" && <UserOutlined />}
                    {item.icon === "area-chart" && <AreaChartOutlined />}
                    {item.icon === "setting" && <SettingOutlined />}
                    {item.icon === "game" && <TrophyOutlined />}
                    <span>{item.label}</span>
                  </span>
                }
              >
                {item.children.map((subItem) => (
                  <Menu.Item key={subItem.key}>
                    <Link to={subItem.url}>
                      {
                        <span>
                          {subItem.icon === "coin" && <DollarCircleOutlined />}
                          {subItem.icon === "account" && <UserOutlined />}
                          {subItem.icon === "game" && <TrophyOutlined />}
                          {subItem.icon === "message" && <MessageOutlined />}
                          <span>{subItem.label}</span>
                        </span>
                      }
                    </Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            );
          } else {
            return (
              <Menu.Item key={item.key}>
                <Link to={item.url}>
                  {item.icon === "home" && <HomeOutlined />}
                  {item.icon === "user" && <UserOutlined />}
                  {item.icon === "area-chart" && <AreaChartOutlined />}
                  {item.icon === "setting" && <SettingOutlined />}
                  {item.icon === "game" && <TrophyOutlined />}
                  <span>{item.label}</span>
                </Link>
              </Menu.Item>
            );
          }
        })}
      </Menu>
    </div>
  );
};

export default Sidebar;
