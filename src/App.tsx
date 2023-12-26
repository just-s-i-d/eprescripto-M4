import { useContext } from "react";

import { ConfigProvider } from "antd";
import { Route, Routes } from "react-router-dom";

import PrivateRoute from "@routes/PrivateRoute";
import { UserContext } from "@context/UserProvider";
import DashboardLayout from "@layouts/DashboardLayout";
import { darkTheme, lightTheme } from "./theme/theme.ts";
import DoctorDashboardPage from "@pages/Doctor/DoctorDashboardPage.tsx";
import PatientDashboardPage from "@pages/PatientDashboardPage.tsx";
import DoctorAppointmentsPage from "@pages/Doctor/DoctorAppointmentsPage.tsx";
import ProfilePage from "@pages/ProfilePage.tsx";
import DoctorReviewsPage from "@pages/Doctor/DoctorReviewsPage.tsx";
import ForbiddenAccessPage from "@pages/ForbiddenAccessPage.tsx";
import PageNotFound from "@pages/PageNotFound.tsx";
import RouteWrapperComponent from "@routes/RouteWrapperComponent.tsx";
import "./App.scss";
import GuestRoute from "@routes/GuestRoute.tsx";
import AuthPage from "@pages/Auth/AuthPage.tsx";
import GoogleAuthPage from "@pages/Auth/GoogleAuthPage.tsx";
import DoctorPrescriptionPage from "@pages/Doctor/DoctorPrescriptionPage.tsx";

function App() {
  const { isDarkTheme, setIsDarkTheme } = useContext(UserContext);
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
                    doctor: <DoctorDashboardPage darkMode={isDarkTheme} />,
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
                    doctor: <DoctorPrescriptionPage />,
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
                    doctor: <ProfilePage darkMode={isDarkTheme} />,
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
        <Route path="auth" element={<GuestRoute />}>
          <Route index element={<AuthPage />} />
          <Route path="google" element={<GoogleAuthPage />} />
        </Route>
        <Route path="/forbidden" element={<ForbiddenAccessPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
