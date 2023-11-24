import { Routes, Route } from "react-router-dom";

import "./App.css";
import PageNotFound from "@pages/PageNotFound";
import PrivateRoute from "@routes/PrivateRoute";
import DashboardLayout from "@layouts/DashboardLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />} />
      </Route>
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
