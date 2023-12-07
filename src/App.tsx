import { useContext, useEffect, useState } from "react";

import { ConfigProvider } from "antd";
import { Route, Routes } from "react-router-dom";

import PrivateRoute from "@routes/PrivateRoute";
import { UserContext } from "@context/UserProvider";
import DashboardLayout from "@layouts/DashboardLayout";
import { darkTheme, lightTheme } from "./theme/theme.ts";
import DoctorDashboardPage from "@pages/Doctor/DoctorDashboardPage.tsx";
import Loading from "@components/ui/Loading.tsx";
import PatientDashboardPage from "@pages/PatientDashboardPage.tsx";
import DoctorAppointmentsPage from "@pages/Doctor/DoctorAppointmentsPage.tsx";
import ProfilePage from "@pages/ProfilePage.tsx";
import DoctorReviewsPage from "@pages/Doctor/DoctorReviewsPage.tsx";
import ForbiddenAccessPage from "@pages/ForbiddenAccessPage.tsx";
import PageNotFound from "@pages/PageNotFound.tsx";
import RouteWrapperComponent from "@routes/RouteWrapperComponent.tsx";
import "./App.scss";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [spinnng, setSpinning] = useState(false);
  const [role, setRole] = useState("");
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []); //temporary for showing loading, will be removed afterwards
  if (userContext === null || loading) return <Loading />;
  return (
    <ConfigProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Routes>
        <Route element={<DashboardLayout setIsDarkTheme={setIsDarkTheme} />}>
          <Route
            path="/"
            element={<PrivateRoute allowedRoles={["doctor", "patient"]} />}
          >
            <Route
              path="dashboard"
              element={
                <RouteWrapperComponent
                  components={{
                    doctor: <DoctorDashboardPage />,
                    patient: <PatientDashboardPage />,
                  }}
                />
              }
            />
            <Route
              path="prescription"
              element={
                <RouteWrapperComponent
                  components={{
                    doctor: <h1>Doctor Prescriptions Page</h1>,
                  }}
                />
              }
            />
            <Route
              path="appointments"
              element={
                <RouteWrapperComponent
                  components={{
                    doctor: <DoctorAppointmentsPage />,
                    patient: <h1>Appointments</h1>,
                  }}
                />
              }
            />
            <Route
              path="reviews"
              element={
                <RouteWrapperComponent
                  components={{
                    doctor: <DoctorReviewsPage />,
                    patient: <h1>Reviews</h1>,
                  }}
                />
              }
            />
            <Route
              path="profile"
              element={
                <RouteWrapperComponent
                  components={{
                    doctor: <ProfilePage />,
                    patient: <h1>Profile</h1>,
                  }}
                />
              }
            />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["patient"]} />}>
            <Route
              path="prescriptions"
              element={
                <RouteWrapperComponent
                  components={{
                    patient: <h1>Patient Prescriptions Page</h1>,
                  }}
                />
              }
            />
            <Route
              path="doctors"
              element={
                <RouteWrapperComponent
                  components={{
                    patient: <h1>Patient Doctors Page</h1>,
                  }}
                />
              }
            />
          </Route>
        </Route>
        <Route path="/forbidden" element={<ForbiddenAccessPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
