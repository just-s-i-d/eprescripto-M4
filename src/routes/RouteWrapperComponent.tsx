import { ReactElement, useContext } from "react";

import Loading from "@components/ui/Loading";
import { UserContext } from "@context/UserProvider";

type RouteWrapperComponentProps = {
  components: { [key: string]: ReactElement };
};
const RouteWrapperComponent = ({ components }: RouteWrapperComponentProps) => {
  const userContext = useContext(UserContext);
  const role = userContext?.role;
  return role ? components?.[role] : <Loading />;
};
export default RouteWrapperComponent;
