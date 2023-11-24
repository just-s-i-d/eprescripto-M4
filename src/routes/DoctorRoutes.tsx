import { Route, Routes } from "react-router-dom";

import DoctorDashboardPage from "@pages/DoctorDashboardPage";
const DoctorRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<DoctorDashboardPage />} />
      <Route path="prescription" element={<h1>Prescriptions</h1>} />
      <Route path="appointments" element={<h1>Appointments</h1>} />
      <Route path="reviews" element={<h1>Reviews</h1>} />
      <Route path="profile" element={<h1>Profile</h1>} />
    </Routes>
  );
};
export default DoctorRoutes;
