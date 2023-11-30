import { PropsWithChildren } from "react";

const CardTitle = ({ children }: PropsWithChildren) => {
  return <h1 className="text-xl font-bold mb-6">{children}</h1>;
};
export default CardTitle;
