import { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ConfigProvider, Spin } from "antd";

import "./App.css";
import PrivateRoute from "@routes/PrivateRoute";
import DashboardLayout from "@layouts/DashboardLayout";
import { darkTheme, lightTheme } from "./theme/Theme";
import { UserContext } from "@context/UserProvider";
import RoleBasedRoutes from "@routes/RoleBasedRoutes";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const userContext = useContext(UserContext);
  if (userContext === null) return <Spin />;
  const { role } = userContext;
  return (
    <ConfigProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route
            path="/"
            element={<DashboardLayout setIsDarkTheme={setIsDarkTheme} />}
          >
            <Route path="/*" element={<RoleBasedRoutes role={role} />} />
          </Route>
        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default App;
