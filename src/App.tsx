import { Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";

import PageNotFound from "@pages/PageNotFound";
import PrivateRoute from "@routes/PrivateRoute";
import DashboardLayout from "@layouts/DashboardLayout";
import "./App.css";
import DoctorDashboardPage from "@pages/DoctorDashboardPage";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimaryBg: "#2fbfa0",
          colorText: "black",
          colorPrimaryText: "#2fbfa0",
          colorBgTextHover: "#4CC4AA",
          colorLink: "white",
          colorTextSecondary: "black",
        },
        components: {
          Menu: {
            itemSelectedColor: "white",
            itemHoverColor: "white",
            iconSize: 17,
          },
          Popover: {
            fontSize: 18,
          },
        },
      }}
    >
      <Routes>
        <Route path="/" element={<PrivateRoute isLoggedIn />}>
          <Route path="doctor" element={<DashboardLayout role="doctor" />}>
            <Route path="home" element={<DoctorDashboardPage />} />
            <Route path="prescription" element={<h1>Prescriptions</h1>} />
            <Route path="appointments" element={<h1>Appointments</h1>} />
            <Route path="reviews" element={<h1>Reviews</h1>} />
            <Route path="profile" element={<h1>Profile</h1>} />
          </Route>
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
