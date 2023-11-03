import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReadOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";

import "./layout.scss";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();

  return (
    <Layout>
      <Sider
        className="admin-aside"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="admin-logo">{collapsed ? "NN" : "Nodirbek"}</div>
        <Menu
          theme="dark"
          // mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/dashboard",
              icon: <DashboardOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "/education",
              icon: <ReadOutlined />,
              label: <Link to="/educations">Educations</Link>,
            },
            {
              key: "/skills",
              icon: <StarOutlined />,
              label: <Link to="/skills">Skills</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="admin-header"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          className="admin-main"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
