import { SetStateAction, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { Menu, Switch, theme, Layout } from "antd";

import { DOCTOR_NAV_LINKS, PATIENT_NAV_LINKS } from "@constants/constants";

const { Sider } = Layout;

type SideBarProps = {
  role?: string;
  textColor: string;
  setIsDarkTheme?: React.Dispatch<SetStateAction<boolean>>;
  collapsed: boolean;
  setCollapsed: React.Dispatch<SetStateAction<boolean>>;
};
const SideBar: React.FC<SideBarProps> = ({
  role,
  setIsDarkTheme,
  collapsed,
  setCollapsed,
}) => {
  const [pathname, setPathname] = useState<string>("");
  const location = useLocation();
  const [collapsedWidth, setCollapsedWidth] = useState<number>(80);
  const sideBarLinks = role === "doctor" ? DOCTOR_NAV_LINKS : PATIENT_NAV_LINKS;
  const {
    token: { colorPrimaryBg },
  } = theme.useToken();

  useEffect(() => {
    const currentPath = location.pathname.split("/")[1];
    setPathname(currentPath);
  }, [location.pathname]);

  return (
    <Sider
      className="h-[92vh] max-xl:top-[8vh] left-0 max-xl:sticky max-lg:fixed z-10"
      width={250}
      breakpoint="lg"
      onBreakpoint={(broken) => {
        if (broken) {
          setCollapsedWidth(0);
          setCollapsed(true);
        } else {
          setCollapsedWidth(80);
        }
      }}
      collapsible
      collapsed={collapsed}
      collapsedWidth={collapsedWidth}
      trigger={null}
    >
      <Menu
        mode="inline"
        className="h-full text-xl px-2 relative"
        selectedKeys={[pathname]}
      >
        {sideBarLinks.map((element) => (
          <Menu.Item
            key={element.key}
            icon={element.icon}
            className="my-6 py-2 flex"
          >
            <NavLink className="text-lg" to={element.key}>
              {element.label}
            </NavLink>
          </Menu.Item>
        ))}
        <Switch
          className={`absolute bottom-6`}
          style={{ backgroundColor: colorPrimaryBg }}
          checkedChildren="Dark"
          unCheckedChildren="Light"
          onChange={(value) => setIsDarkTheme && setIsDarkTheme(value)}
        />
      </Menu>
    </Sider>
  );
};
export default SideBar;
