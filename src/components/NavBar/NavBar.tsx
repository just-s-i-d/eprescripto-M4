import React, { SetStateAction, useState } from "react";
import { Link } from "react-router-dom";

import { Avatar, Badge, Popover, Button, Space } from "antd";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import ProfilePopOverContent from "../ui/ProfilePopOverContent";
import { Header } from "antd/es/layout/layout";

interface navBarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<SetStateAction<boolean>>;
  colorPrimaryBg: string;
  colorText: string;
}
const NavBar = ({
  collapsed,
  setCollapsed,
  colorPrimaryBg,
  colorText,
}: navBarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Header
      className={`px-6 sticky top-0 z-10 flex items-center justify-between h-[8vh]`}
      style={{ backgroundColor: colorPrimaryBg, color: colorText }}
    >
      <span className="text-3xl text-white">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="text-sm text-white w-8 h-8"
        />
        <Link to="/">ePrescripto</Link>
      </span>
      <Space>
        <Popover
          content={<ProfilePopOverContent />}
          trigger="click"
          open={open}
          onOpenChange={(value: boolean) => setOpen(value)}
        >
          <Badge count={0} size="small">
            <Avatar size={42} icon={<UserOutlined />} />
          </Badge>
        </Popover>
      </Space>
    </Header>
  );
};
export default NavBar;
