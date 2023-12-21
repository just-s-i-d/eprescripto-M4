import { Space } from "antd";
import { ReactNode } from "react";

type CardSiderPropsType = {
  children?: ReactNode;
  hidden: boolean;
};
const CardSider = ({ children, hidden }: CardSiderPropsType) => {
  return (
    <Space
      className="xs:w-full xs:mb-8 xs:h-[20%] md:mb-0 md:w-[45%] bg-[#5bc1c7] rounded-[30px] px-6 md:h-full flex justify-center items-center"
      direction="vertical"
    >
      <h1
        className={`text-center text-4xl text-white mb-4 xs:mt-4 md:mt-0 ${
          hidden && "xs:hidden"
        } md:block`}
      >
        ePrescripto
      </h1>
      {children}
    </Space>
  );
};
export default CardSider;
