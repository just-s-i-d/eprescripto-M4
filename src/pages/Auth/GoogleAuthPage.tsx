import Loading from "@components/ui/Loading";
import { UserContext } from "@context/UserProvider";
import { getJwtToken } from "@utils/Doctor";
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GoogleAuthPage = () => {
  const userContext = useContext(UserContext);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const idToken = params.get("id_token");
    const accessToken = params.get("access_token");
    if (idToken && accessToken) {
      getJwtToken(idToken, accessToken)
        .then(() => {
          setIsLoggedIn(true);
          navigate("/dashboard", { replace: true });
        })
        .catch(() => {
          navigate("/auth", { replace: true });
        });
    }
  }, []);
  if (!userContext) return <Loading />;
  const { setIsLoggedIn } = userContext;
  return <Loading />;
};
export default GoogleAuthPage;
