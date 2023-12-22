import { UserContext } from "@context/UserProvider";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoute = () => {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <>
      {!isLoggedIn && <Outlet />}
      {isLoggedIn && <Navigate to="/dashboard" />}
    </>
  );
};
export default GuestRoute;
