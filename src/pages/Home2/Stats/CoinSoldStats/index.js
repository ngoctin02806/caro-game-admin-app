import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./styles.css";
import { Line } from "@ant-design/charts";
import { Card, PageHeader, Tabs, ProTable } from "antd";

import { BASE_API_URL } from "../../../../utils/constant";
import AuthService from "../../../../service/auth-service";

const { TabPane } = Tabs;

const CoinSoldStats = () => {
  const [statsByDay, setStatsByDay] = useState([]);
  const [statsByWeek, setStatsByWeek] = useState([]);
  const [statsByMonth, setStatsByMonth] = useState([]);
  const [statsByYear, setStatsByYear] = useState([]);

  useEffect(() => {
    axios(
      `${BASE_API_URL}/api/v1/admin-stats/transactions/sale-amount-by-day`,
      {
        method: "GET",
        headers: AuthService.authHeader(),
      }
    )
      .then((res) => {
        setStatsByDay(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    axios(
      `${BASE_API_URL}/api/v1/admin-stats/transactions/sale-amount-by-week`,
      {
        method: "GET",
        headers: AuthService.authHeader(),
      }
    )
      .then((res) => {
        setStatsByWeek(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    axios(
      `${BASE_API_URL}/api/v1/admin-stats/transactions/sale-amount-by-month`,
      {
        method: "GET",
        headers: AuthService.authHeader(),
      }
    )
      .then((res) => {
        setStatsByMonth(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    axios(
      `${BASE_API_URL}/api/v1/admin-stats/transactions/sale-amount-by-year`,
      {
        method: "GET",
        headers: AuthService.authHeader(),
      }
    )
      .then((res) => {
        setStatsByYear(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  const routes = [
    {
      breadcrumbName: "Home",
    },
    {
      breadcrumbName: "Stats",
    },
    {
      breadcrumbName: "Stats of Coin Sold",
    },
  ];

  const configChartDay = {
    data: statsByDay,

    xField: "str_day_week",
    yField: "total_amount",
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
      title: "Thống kê doanh thu bán coin trong tuần",
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

  const configChartWeek = {
    data: statsByWeek,
    xField: "week",
    yField: "total_amount",
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
      title: "Thống kê doanh thu bán coin trong tháng",
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

  const configChartMonth = {
    data: statsByMonth,
    xField: "date",
    yField: "total_amount",
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
      title: "Thống kê doanh thu bán coin theo tháng",
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

  const configChartYear = {
    data: statsByYear,
    xField: "year",
    yField: "total_amount",
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
      title: "Thống kê doanh thu bán coin theo năm",
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

  return (
    <HelmetProvider>
      <Helmet>
        <title>Stats of Coin Sold</title>
      </Helmet>
      <>
        <PageHeader
          className="site-page-header"
          title="Stats of Coin Sold"
          breadcrumb={{ routes }}
          subTitle=""
        />
        <Card className="chart-card">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Day" key="1">
              <Line className="chart" {...configChartDay} />
            </TabPane>
            <TabPane tab="Week" key="2">
              <Line className="chart" {...configChartWeek} />
            </TabPane>
            <TabPane tab="Month" key="3">
              <Line className="chart" {...configChartMonth} />
            </TabPane>
            <TabPane tab="Year" key="4">
              <Line className="chart" {...configChartYear} />
            </TabPane>
          </Tabs>
        </Card>
        <Card>table</Card>
      </>
    </HelmetProvider>
  );
};

export default CoinSoldStats;
