import {
  DashboardOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import {
  BackTop,
  Breadcrumb,
  Card,
  Col,
  Row,
  Spin,
  Typography,
} from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import React, { useEffect, useState } from "react";
import dashBoardApi from "../../apis/dashBoardApi";
import articleApi from "../../apis/articleApi";
import "./dashBoard.css";

const DashBoard = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [totalAcademicYears, setTotalAcademicYears] = useState(0);
  const [totalByFaculty, setTotalFaculties] = useState(0);
  const [totalByStatus, setTotalByStatus] = useState([]);
  const [faculty, setFaculty] = useState();
  const [role, setRole] = useState();
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setRole(user.role);
    setFaculty(user.facultyId);
    const fetchArticles = async () => {
      try {
        const response = await articleApi.getArticlePublic();
        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch articles:" + error);
        setLoading(false);
      }
    };
    fetchArticles();
    const fetchData = async () => {
      try {
        const [academicResponse, facultyResponse, statusResponse] =
          await Promise.all([
            dashBoardApi.getTotalByAcademic(),
            dashBoardApi.getTotalByFaculty(),
            dashBoardApi.getTotalByStatus(),
          ]);
        const academicData = academicResponse.data.map((item) => ({
          name: item.name,
          count: item.count,
        }));
        setTotalAcademicYears(academicData);
        const facultyData = facultyResponse.data.map((item) => ({
          name: item.facultyName,
          count: item.totalArticles,
        }));
        setTotalFaculties(facultyData);
        const statusData = [
          { name: "Pending", count: statusResponse.data.pending },
          { name: "Approved", count: statusResponse.data.approved },
          { name: "Rejected", count: statusResponse.data.rejected },
        ];
        setTotalByStatus(statusData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <div>
      <Spin spinning={loading}>
        <div className="container">
          <div style={{ marginTop: 20 }}>
            <Breadcrumb>
              <Breadcrumb.Item href="">
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item href="">
                <DashboardOutlined />
                <span>DashBoard</span>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          {role !== "student" && role !== "guest" && role !== "admin" && (
            <>
              <Row gutter={12}>
                <Col span={24}>
                  <h3>Chart By Academic Year</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={totalAcademicYears}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </Col>
              </Row>
              <Row gutter={12}>
                <Col span={24}>
                  <h3>Chart By Faculty</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={totalByFaculty}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </Col>
              </Row>
              <Row gutter={12}>
                <Col span={24}>
                  <h3>Chart By Status</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={totalByStatus}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </Col>
              </Row>
              {totalByFaculty.length > 0 && (
                <Row gutter={12}>
                  <Col span={24}>
                    <h3>Percentage of Articles by Faculty</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart width={400} height={400}>
                        <Pie
                          data={totalByFaculty}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {totalByFaculty.length === 1 && (
                            <Cell key={`cell-0`} fill={COLORS[0]} />
                          )}
                          {totalByFaculty.length > 1 && totalByFaculty.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        {totalByFaculty.length > 1 && <Legend />}
                      </PieChart>
                    </ResponsiveContainer>
                  </Col>
                </Row>
              )}
              {totalByFaculty.length === 0 && (
                <Row gutter={12}>
                  <Col span={24}>
                    <Typography.Text>No data available for PieChart</Typography.Text>
                  </Col>
                </Row>
              )}

            </>
          )}
          {role === "guest" && (
            <>
              <Row>
                <h1 style={{ marginLeft: 2 }}>Public Aritcle</h1>
              </Row>
              <Row gutter={12}>
                {articles.map((article) =>
                  (role === "guest" && article.facultyId === faculty) ||
                    role !== "guest" ? (
                    <Col xs={24} sm={12} md={6} key={article._id} className="text-center" style={{ marginBottom: 10 }}>
                      <Card className="card_total">
                        <div className="card_header">
                          <h3>TITLE: {article.title.toUpperCase()}</h3>
                        </div>
                        <div className="card_body mb-5">
                          {/* Đây là nơi hiển thị hình ảnh */}
                          <img
                            src={article.image}
                            alt={article.title}
                            style={{ width: "100%", height: "auto", maxHeight: "150px" }}
                          />
                        </div>
                        <div className="card_body">
                          {/* Hiển thị nội dung của bài viết */}
                          <Typography.Paragraph>
                            {article.content}
                          </Typography.Paragraph>
                        </div>
                        <div>Author: {article.author}</div>
                      </Card>
                    </Col>
                  ) : (
                    <Col xs={24} sm={12} md={6} key={article._id} className="text-center">
                      <Card className="card_total">
                        <div className="card_header">
                          <h3>TITLE: {article.title.toUpperCase()}</h3>
                        </div>
                        <div className="card_body mb-5">
                          {/* Đây là nơi hiển thị hình ảnh */}
                          <img
                            src={article.image}
                            alt={article.title}
                            style={{ width: "auto", height: 150 }}
                          />
                        </div>
                        <div className="card_body">
                          {/* Hiển thị nội dung của bài viết */}
                          <Typography.Paragraph>
                            {article.content}
                          </Typography.Paragraph>
                        </div>
                        <div>Author: {article.author}</div>
                      </Card>
                    </Col>
                  )
                )}
              </Row>
            </>
          )}
        </div>
        <BackTop style={{ textAlign: "right" }} />
      </Spin>
    </div>
  );
};

export default DashBoard;
