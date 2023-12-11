import { notification } from "antd";

export const showToast = (message: string, type: "success" | "error") => {
  notification.open({
    message: type === "success" ? "Success" : "Error",
    description: message,
    type: type,
    className: `bg-${type}-bgColor border rounded border-${type}-borderColor`,
    duration: 3,
  });
};
