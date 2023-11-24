import UnauthorisedPage from "@pages/UnauthorisedPage";
import DoctorRoutes from "./DoctorRoutes";
import PatientRoutes from "./PatientRoutes";

type PropsType = {
  role: string;
};
const RoleBasedRoutes = ({ role }: PropsType) => {
  switch (role) {
    case "doctor":
      return <DoctorRoutes />;
    case "patient":
      return <PatientRoutes />;
    default:
      return <UnauthorisedPage />;
  }
};
export default RoleBasedRoutes;
