import Loading from "@components/ui/Loading";
import { UserContext } from "@context/UserProvider";
import { getJwtToken } from "@utils/Doctor";
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GoogleAuthPage = () => {
  const { setIsLoggedIn, getRole } = useContext(UserContext);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const idToken = params.get("id_token");
    const accessToken = params.get("access_token");
    if (idToken && accessToken) {
      getJwtToken(idToken, accessToken)
        .then(() => {
          setIsLoggedIn && setIsLoggedIn(true);
          getRole && getRole();
          navigate("/dashboard", { replace: true });
        })
        .catch(() => {
          navigate("/auth", { replace: true });
        });
    }
  }, []);
  return <Loading />;
};
export default GoogleAuthPage;
