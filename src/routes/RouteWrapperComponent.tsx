import Loading from "@components/ui/Loading";
import { UserContext } from "@context/UserProvider";
import { ReactElement, useContext } from "react";

type RouteWrapperComponentProps = {
  components: { [key: string]: ReactElement };
};
const RouteWrapperComponent = ({ components }: RouteWrapperComponentProps) => {
  const userContext = useContext(UserContext);
  if (userContext === null) return <Loading />;
  const { role } = userContext;

  return components?.[role];
};
export default RouteWrapperComponent;
