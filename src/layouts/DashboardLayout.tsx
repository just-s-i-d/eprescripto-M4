import { SetStateAction, useContext, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Breadcrumb, Layout, theme, Space } from "antd";
import Item from "antd/es/list/Item";

import NavBar from "@components/NavBar/NavBar";
import SideBar from "@components/SideBar/Sidebar";
import { UserContext } from "@context/UserProvider";
import Loading from "@components/ui/Loading";

type Props = {
  setIsDarkTheme: React.Dispatch<SetStateAction<boolean>>;
};

const DashboardLayout: React.FC<Props> = ({ setIsDarkTheme }) => {
  const userContext = useContext(UserContext);
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const {
    token: { colorText, colorTextSecondary, colorPrimaryBg },
  } = theme.useToken();

  if (userContext === null) return <Loading />;
  const { role } = userContext;

  return (
    <Layout className="min-h-screen h-full relative">
      <NavBar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        colorPrimaryBg={colorPrimaryBg}
        colorText={colorText}
      />
      <Layout className="relative">
        <SideBar
          role={role}
          textColor={colorTextSecondary}
          setIsDarkTheme={setIsDarkTheme}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <Layout className="pb-6 px-6">
          <Space className="flex justify-between" direction="horizontal">
            <Breadcrumb className="text-2xl my-4">
              <Item>{location.pathname.split("/")[1].toUpperCase()}</Item>
            </Breadcrumb>
          </Space>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
