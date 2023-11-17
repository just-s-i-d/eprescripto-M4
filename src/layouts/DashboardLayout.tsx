import { Outlet } from "react-router-dom";

import { Breadcrumb, Layout, theme, Switch, Space } from "antd";
import NavBar from "../components/NavBar/NavBar";
import SideBar from "../components/SideBar/Sidebar";

const { Header, Content, Sider } = Layout;
type Props = {
  role: string;
};

const DashboardLayout: React.FC<Props> = ({ role }) => {
  const {
    token: { colorBgContainer, colorText, colorTextSecondary, colorPrimaryBg },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "8vh",
          backgroundColor: colorPrimaryBg,
          padding: "10px 30px",
          color: colorText,
        }}
      >
        <NavBar />
      </Header>
      <Layout>
        <Sider
          width={250}
          style={{ backgroundColor: "#009fab" }}
          breakpoint="md"
          collapsedWidth={0}
        >
          <SideBar role={role} textColor={colorTextSecondary} />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Space
            direction="horizontal"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Breadcrumb style={{ margin: "16px 0", fontSize: "1.3em" }}>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            <Switch checkedChildren="Dark" unCheckedChildren="Light" />
          </Space>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              borderRadius: 10,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
