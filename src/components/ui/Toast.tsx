import { notification } from "antd";

type ToastProps = {
  open: boolean;
};
const Toast = ({ open }: ToastProps) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: "Notification Title",
      description:
        "I will never close automatically. This is a purposely very very long description that has many many characters and words.",
      duration: 0,
    });
  };

  return (
    <>
      {contextHolder}
      {open && openNotification()}
    </>
  );
};

export default Toast;
