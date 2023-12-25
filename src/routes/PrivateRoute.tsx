import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { UserContext } from "@context/UserProvider";

type PrivateRouteProps = {
  allowedRoles: string[];
};
const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const { isLoggedIn, role } = useContext(UserContext);
  return (
    <>
      {!isLoggedIn && <Navigate to="/auth" />}
      {isLoggedIn && role && !allowedRoles.includes(role) && (
        <Navigate to="/forbidden" />
      )}
      {isLoggedIn && role && allowedRoles.includes(role) && <Outlet />}
    </>
  );
};

export default PrivateRoute;
