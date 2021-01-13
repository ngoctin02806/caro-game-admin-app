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
      breadcrumbName: "Stats of Played Games",
    },
  ];

  return (
    <HelmetProvider>
      <Helmet>
        <title>Stats of Played Games</title>
      </Helmet>
      <>
        <PageHeader
          className="site-page-header"
          title="Stats of Played Games"
          breadcrumb={{ routes }}
          subTitle=""
        />
      </>
    </HelmetProvider>
  );
};

export default PlayedGameStats;
