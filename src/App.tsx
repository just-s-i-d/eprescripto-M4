import { Routes, Route } from "react-router-dom";

import "./App.css";
import PageNotFound from "./pages/PageNotFound";
import PrivateRoute from "./routes/PrivateRoute";
import DoctorDashboardLayout from "./layouts/DoctorDashboardLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute isLoggedIn />}>
        <Route path="/dashboard" element={<DoctorDashboardLayout />} />
      </Route>
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
