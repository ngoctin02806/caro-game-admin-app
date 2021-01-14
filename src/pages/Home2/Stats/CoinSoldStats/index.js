import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./styles.css";
import { Line, Pie } from "@ant-design/charts";
import { Card, PageHeader, Tabs, Row, Col, Table } from "antd";

import { BASE_API_URL } from "../../../../utils/constant";
import AuthService from "../../../../service/auth-service";

const { TabPane } = Tabs;

const CoinSoldStats = () => {
  const [statsByDay, setStatsByDay] = useState([]);
  const [statsByWeek, setStatsByWeek] = useState([]);
  const [statsByMonth, setStatsByMonth] = useState([]);
  const [statsByYear, setStatsByYear] = useState([]);
  const [topTopupUser, setTopUpUser] = useState([]);
  const [statsType, setStatsType] = useState([]);

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

    axios(`${BASE_API_URL}/api/v1/admin-stats/transactions/top-topup-users`, {
      method: "GET",
      headers: AuthService.authHeader(),
    })
      .then((res) => {
        const data = res.data.data;
        data.map((item, pos) => (item.index = pos + 1));
        setTopUpUser(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    axios(
      `${BASE_API_URL}/api/v1/admin-stats/transactions/stats-transaction-type`,
      {
        method: "GET",
        headers: AuthService.authHeader(),
      }
    )
      .then((res) => {
        setStatsType(res.data.data);
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
      breadcrumbName: "Thống kê",
    },
    {
      breadcrumbName: "Thống kê doanh thu bán coin",
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

  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Tên",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Số tiền đã nạp",
      dataIndex: "total_amount",
      key: "total_amount",
    },
  ];

  const transactionsTypeConfig = {
    appendPadding: 10,
    data: statsType,
    angleField: "total_amount",
    colorField: "type",
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
        <title>Thống kê doanh thu bán coin</title>
      </Helmet>
      <>
        <PageHeader
          className="site-page-header"
          title="Thống kê doanh thu bán coin"
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
        <Row>
          <Col span={11}>
            <Card
              style={{ height: "100%" }}
              title="Top 10 người dùng nạp coin nhiều nhất"
            >
              <Table
                dataSource={topTopupUser}
                columns={columns}
                pagination={false}
              />
            </Card>
          </Col>
          <Col offset={2} span={11}>
            <Card
              style={{ height: "100%" }}
              title="Tỉ lệ phương thức thanh toán"
            >
              <Pie {...transactionsTypeConfig} />
            </Card>
          </Col>
        </Row>
      </>
    </HelmetProvider>
  );
};

export default CoinSoldStats;
