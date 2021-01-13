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
      breadcrumbName: "Stats of Messages",
    },
  ];

  return (
    <HelmetProvider>
      <Helmet>
        <title>Stats of Messages</title>
      </Helmet>
      <>
        <PageHeader
          className="site-page-header"
          title="Stats of Messages"
          breadcrumb={{ routes }}
          subTitle=""
        />
      </>
    </HelmetProvider>
  );
};

export default PlayedGameStats;
