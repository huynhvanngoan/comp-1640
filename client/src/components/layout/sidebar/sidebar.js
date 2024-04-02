import { 
  AuditOutlined, 
  DashboardOutlined,
  ShoppingOutlined,
  UserOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./sidebar.css";

const { Sider } = Layout;

function Sidebar() {
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState([]);

  const menuSidebarAdmin = [
    {
      key: "name",
      title: "Admin Page",
      // link: "/dash-board",
      // icon: <DashboardOutlined />,
    },
    // {
    //   key: "dash-board",
    //   title: "Dashboards",
    //   link: "/dash-board",
    //   icon: <DashboardOutlined />,
    // },
    {
      key: "account-management",
      title: "Account Management",
      link: "/account-management",
      icon: <UserOutlined />,
    },
    {
      key: "asset-list",
      title: "Academic Year",
      link: "/asset-list",
      icon: <ShoppingOutlined />,
    },
    {
      key: "faculty",
      title: "Faculty Management",
      link: "/faculty",
      icon: <ContainerOutlined />,
    },
  ];

  const menuSidebarMarketing = [
    {
      key: "name",
      title: "Coordinator Page",
      // link: "/dash-board",
      // icon: <DashboardOutlined />,
    },
    {
      key: "dash-board",
      title: "Dashboards",
      link: "/dash-board",
      icon: <DashboardOutlined />,
    },
    {
      key: "notifications",
      title: "Ariticle Manager",
      link: "/article",
      icon: <AuditOutlined />,
    },
  ];

  const menuSidebarUser = [
    {
      key: "name",
      title: "Student Page",
      // link: "/dash-board",
      // icon: <DashboardOutlined />,
    },
    {
      key: "article-manager",
      title: "Article Manager Student",
      link: "/article-student",
      icon: <ContainerOutlined />,
    },
  ];

  const menuSidebarDepartment = [
    {
      key: "name",
      title: "Manager Page",
      // link: "/dash-board",
      // icon: <DashboardOutlined />,
    },
    {
      key: "dash-board",
      title: "Dashboards",
      link: "/dash-board",
      icon: <DashboardOutlined />,
    },
    {
      key: "notifications",
      title: "Ariticle Manager",
      link: "/article",
      icon: <AuditOutlined />,
    },
  ];
  const menuSidebarGuest = [
    {
      key: "name",
      title: "Guest Page",
      // link: "/dash-board",
      // icon: <DashboardOutlined />,
    },
    {
      key: "dash-board",
      title: "Dashboards",
      link: "/dash-board",
      icon: <DashboardOutlined />,
    },
  ];

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const navigate = (link, key) => {
    history.push(link);
  };

  useEffect(() => {});

  return (
    <Sider
      className={"ant-layout-sider-trigger"}
      width={230}
      style={{
        position: "fixed",
        top: 60,
        height: "calc(100% - 60px)",
        left: 0,
        padding: 0,
        zIndex: 1,
        marginTop: 0,
        boxShadow: " 0 1px 4px -1px rgb(0 0 0 / 15%)",
        overflowY: "auto",
        background: "#FFFFFF",
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={location.pathname.split("/")}
        defaultOpenKeys={["account"]}
        style={{ height: "100%", borderRight: 0, backgroundColor: "#FFFFFF" }}
        theme="light"
      >
        {user.role === "student"
          ? menuSidebarUser.map((map) => (
              <Menu.Item
                onClick={() => navigate(map.link, map.key)}
                key={map.key}
                icon={map.icon}
                className="customeClass"
              >
                {map.title}
              </Menu.Item>
            ))
          : user.role === "admin"
          ? menuSidebarAdmin.map((map) => (
              <Menu.Item
                onClick={() => navigate(map.link, map.key)}
                key={map.key}
                icon={map.icon}
                className="customeClass"
              >
                {map.title}
              </Menu.Item>
            ))
          : user.role === "marketing"
          ? menuSidebarMarketing.map((map) => (
              <Menu.Item
                onClick={() => navigate(map.link, map.key)}
                key={map.key}
                icon={map.icon}
                className="customeClass"
              >
                {map.title}
              </Menu.Item>
            ))
          : user.role === "department"
          ? menuSidebarDepartment.map((map) => (
              <Menu.Item
                onClick={() => navigate(map.link, map.key)}
                key={map.key}
                icon={map.icon}
                className="customeClass"
              >
                {map.title}
              </Menu.Item>
            ))
          : user.role === "guest"
          ? menuSidebarGuest.map((map) => (
              <Menu.Item
                onClick={() => navigate(map.link, map.key)}
                key={map.key}
                icon={map.icon}
                className="customeClass"
              >
                {map.title}
              </Menu.Item>
            ))
          : null}
      </Menu>
    </Sider>
  );
}

export default Sidebar;
