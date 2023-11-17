import { useState } from "react";
import { Link } from "react-router-dom";

import { Avatar, Badge, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";

import ProfilePopOverContent from "../ui/ProfilePopOverContent";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  return (
    <>
      <span className="brand">
        <Link to="/">ePrescripto</Link>
      </span>
      <Popover
        content={<ProfilePopOverContent />}
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <Badge count={0} size="small">
          <Avatar size={42} icon={<UserOutlined />} />
        </Badge>
      </Popover>
    </>
  );
};
export default NavBar;
