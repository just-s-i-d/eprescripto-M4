import Loading from "@components/ui/Loading";
import { UserContext } from "@context/UserProvider";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoute = () => {
  const userContext = useContext(UserContext);
  if (!userContext) return <Loading />;
  const { isLoggedIn } = userContext;
  return (
    <>
      {!isLoggedIn && <Outlet />}
      {isLoggedIn && <Navigate to="/dashboard" />}
    </>
  );
};
export default GuestRoute;
