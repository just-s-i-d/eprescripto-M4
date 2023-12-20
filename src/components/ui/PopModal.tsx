import { Modal } from "antd";
import { ReactNode, SetStateAction, useState } from "react";

type ConfirmModalPropsType = {
  title: string;
  okButtonText?: string;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  footer?: boolean;
  className?: string;
  confirmHandler?: VoidFunction;
};
const PopModal = ({
  open,
  setOpen,
  children,
  title,
  okButtonText,
  footer,
  className,
  confirmHandler,
}: ConfirmModalPropsType) => {
  const [loading, setLoading] = useState(false);
  const handleOk = () => {
    setLoading(true);
    if (confirmHandler)
      setTimeout(() => {
        confirmHandler();
        setLoading(false);
        setOpen(false);
      }, 1000);
  };

  return (
    <Modal
      className={className}
      open={open}
      title={title}
      centered
      okText={okButtonText || "Sure"}
      onOk={handleOk}
      onCancel={() => setOpen(false)}
      confirmLoading={loading}
      footer={
        footer
          ? (_, { OkBtn, CancelBtn }) => (
              <>
                <CancelBtn />
                <OkBtn />
              </>
            )
          : null
      }
    >
      {children}
    </Modal>
  );
};
export default PopModal;
