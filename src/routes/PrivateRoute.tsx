import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { UserContext } from "@context/UserProvider";
import UnauthorisedPage from "@pages/UnauthorisedPage";
import Loading from "@components/ui/Loading";

const PrivateRoute = () => {
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (userContext === null) return <Loading />;
  const { isLoggedIn } = userContext;
  return loading ? <Loading /> : isLoggedIn ? <Outlet /> : <UnauthorisedPage />;
};

export default PrivateRoute;
