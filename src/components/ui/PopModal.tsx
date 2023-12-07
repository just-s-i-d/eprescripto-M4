import { Modal } from "antd";
import { ReactNode, SetStateAction } from "react";

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
  const handleOk = () => {
    if (confirmHandler) confirmHandler();
    setOpen(false);
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
