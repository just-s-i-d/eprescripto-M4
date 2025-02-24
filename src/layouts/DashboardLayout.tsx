import { SetStateAction, useContext, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Breadcrumb, Layout, theme, Space } from "antd";

import NavBar from "@components/NavBar/NavBar";
import SideBar from "@components/SideBar/Sidebar";
import { UserContext } from "@context/UserProvider";

type Props = {
  setIsDarkTheme?: React.Dispatch<SetStateAction<boolean>>;
};

const DashboardLayout: React.FC<Props> = ({ setIsDarkTheme }) => {
  const { role } = useContext(UserContext);
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const {
    token: { colorTextSecondary },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen h-screen relative overflow-hidden">
      <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout className="flex flex-row">
        <SideBar
          role={role}
          textColor={colorTextSecondary}
          setIsDarkTheme={setIsDarkTheme}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <Layout className="pb-6 px-6 max-sm:px-3 overflow-y-scroll overflow-x-hidden">
          <Space className="flex justify-between" direction="horizontal">
            <Breadcrumb className="text-2xl my-4">
              <Breadcrumb.Item>
                {location.pathname.split("/")[1].toUpperCase()}
              </Breadcrumb.Item>
            </Breadcrumb>
          </Space>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
