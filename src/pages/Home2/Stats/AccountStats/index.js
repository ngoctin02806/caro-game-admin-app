import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./styles.css";

import { Card, PageHeader } from "antd";
import { Pie } from "@ant-design/charts";

import { BASE_API_URL } from "../../../../utils/constant";
import AuthService from "../../../../service/auth-service";

const PlayedGameStats = () => {
  const [statsAccountProvider, setStatsAccountProvider] = useState([]);

  useEffect(() => {
    axios(`${BASE_API_URL}/api/v1/admin-stats/users/stats-account-provider`, {
      method: "GET",
      headers: AuthService.authHeader(),
    })
      .then((res) => {
        setStatsAccountProvider(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  const routes = [
    {
      breadcrumbName: "Trang chủ",
    },
    {
      breadcrumbName: "Thống kế",
    },
    {
      breadcrumbName: "Thống kê tài khoản",
    },
  ];

  const TypeConfig = {
    appendPadding: 10,
    data: statsAccountProvider,
    angleField: "count",
    colorField: "provider",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: function content(_ref) {
        var percent = _ref.percent;
        return "".concat(Math.round(percent * 100), "%");
      },
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [{ type: "element-active" }],
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Thống kê tài khoản</title>
      </Helmet>
      <>
        <PageHeader
          className="site-page-header"
          title="Thống kê tài khoản"
          breadcrumb={{ routes }}
          subTitle=""
        />
        <Card title="Tỉ lệ nguồn đăng nhập tài khoản">
          <Pie {...TypeConfig} />
        </Card>
      </>
    </HelmetProvider>
  );
};

export default PlayedGameStats;
