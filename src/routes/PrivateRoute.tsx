import { Outlet, Navigate } from "react-router-dom";

type props = {
  isLoggedIn: boolean;
};
const PrivateRoute = ({ isLoggedIn }: props) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
