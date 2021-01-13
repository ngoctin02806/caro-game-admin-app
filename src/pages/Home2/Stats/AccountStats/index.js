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
      breadcrumbName: "Home",
    },
    {
      breadcrumbName: "Stats",
    },
    {
      breadcrumbName: "Stats of Accounts",
    },
  ];

  return (
    <HelmetProvider>
      <Helmet>
        <title>Stats of Accounts</title>
      </Helmet>
      <>
        <PageHeader
          className="site-page-header"
          title="Stats of Accounts"
          breadcrumb={{ routes }}
          subTitle=""
        />
      </>
    </HelmetProvider>
  );
};

export default PlayedGameStats;
