import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./styles.css";

import { Modal, Button, PageHeader } from "antd";

import { BASE_API_URL } from "../../../../utils/constant";
import AuthService from "../../../../service/auth-service";

const PlayedGameStats = () => {
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
      </>
    </HelmetProvider>
  );
};

export default PlayedGameStats;
