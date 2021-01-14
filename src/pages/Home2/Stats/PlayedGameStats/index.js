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
      breadcrumbName: "Thống kê",
    },
    {
      breadcrumbName: "Thống kê các trận đã đấu",
    },
  ];

  return (
    <HelmetProvider>
      <Helmet>
        <title>Thống kê các trận đã đấu</title>
      </Helmet>
      <>
        <PageHeader
          className="site-page-header"
          title="Thống kê các trận đã đấu"
          breadcrumb={{ routes }}
          subTitle=""
        />
      </>
    </HelmetProvider>
  );
};

export default PlayedGameStats;
