import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { UserContext } from "@context/UserProvider";
import Loading from "@components/ui/Loading";

type PrivateRouteProps = {
  allowedRoles: string[];
};
const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const userContext = useContext(UserContext);

  if (userContext === null) return <Loading />;
  const { isLoggedIn, role } = userContext;

  return (
    <>
      {!isLoggedIn && <Navigate to="/unauthorized" />}
      {isLoggedIn && allowedRoles.includes(role) && <Outlet />}
      {isLoggedIn && !allowedRoles.includes(role) && (
        <Navigate to="/forbidden" />
      )}
    </>
  );
};

export default PrivateRoute;
