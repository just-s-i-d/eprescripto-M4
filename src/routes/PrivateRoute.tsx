import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { UserContext } from "@context/UserProvider";
import Loading from "@components/ui/Loading";

type PrivateRouteProps = {
  allowedRoles: string[];
};
const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const userContext = useContext(UserContext);

  if (!userContext) return <Loading />;
  const { isLoggedIn, role } = userContext;

  return (
    <>
      {!isLoggedIn && <Navigate to="/auth" />}
      {isLoggedIn && !allowedRoles.includes(role) && (
        <Navigate to="/forbidden" />
      )}
      {isLoggedIn && allowedRoles.includes(role) && <Outlet />}
    </>
  );
};

export default PrivateRoute;
