import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./styles.css";

import { Card, Row, Col, PageHeader, Table } from "antd";
import { Line, Pie } from "@ant-design/charts";

import { BASE_API_URL } from "../../../../utils/constant";
import AuthService from "../../../../service/auth-service";

const PlayedGameStats = () => {
  const [countGameByDay, setCountGameByDay] = useState([]);
  const [top10UserPlayMost, setTop10UserPlayMost] = useState([]);
  const [top10UserWinMost, setTop10UserWinMost] = useState([]);

  useEffect(() => {
    axios(`${BASE_API_URL}/api/v1/admin-stats/games/stats-games-by-day`, {
      method: "GET",
      headers: AuthService.authHeader(),
    })
      .then((res) => {
        setCountGameByDay(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    axios(`${BASE_API_URL}/api/v1/admin-stats/games/top-users-play-most`, {
      method: "GET",
      headers: AuthService.authHeader(),
    })
      .then((res) => {
        setTop10UserPlayMost(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    axios(`${BASE_API_URL}/api/v1/admin-stats/games/top-user-win-most`, {
      method: "GET",
      headers: AuthService.authHeader(),
    })
      .then((res) => {
        setTop10UserWinMost(res.data.data);
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
      breadcrumbName: "Thống kê",
    },
    {
      breadcrumbName: "Thống kê các trận đã đấu",
    },
  ];

  const configChartDay = {
    data: countGameByDay,

    xField: "str_day_week",
    yField: "count",
    label: {},
    point: {
      size: 5,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
      title: "Thống kê số trận trong ngày",
      showTitle: true,
    },
    state: {
      active: {
        style: {
          shadowColor: "yellow",
          shadowBlur: 4,
          stroke: "transparent",
          fill: "red",
        },
      },
    },
    theme: {
      geometries: {
        point: {
          diamond: {
            active: {
              style: {
                shadowColor: "#FCEBB9",
                shadowBlur: 2,
                stroke: "#F6BD16",
              },
            },
          },
        },
      },
    },
    interactions: [{ type: "marker-active" }],
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Tên",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Đếm",
      dataIndex: "count",
      key: "count",
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
        <Card className="chart-card">
          <Line className="chart" {...configChartDay} />
        </Card>
        <Row>
          <Col span={11}>
            <Card
              style={{ height: "100%" }}
              title="Top 10 người dùng chơi nhiều nhất"
            >
              <Table
                dataSource={top10UserPlayMost}
                columns={columns}
                pagination={false}
              />
            </Card>
          </Col>
          <Col offset={2} span={11}>
            <Card
              style={{ height: "100%" }}
              title="Top 10 người dùng chiến thắng nhiều nhất"
            >
              <Table
                dataSource={top10UserWinMost}
                columns={columns}
                pagination={false}
              />
            </Card>
          </Col>
        </Row>
      </>
    </HelmetProvider>
  );
};

export default PlayedGameStats;
