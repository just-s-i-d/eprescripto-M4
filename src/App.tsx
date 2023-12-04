import { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ConfigProvider, Spin } from "antd";

import PrivateRoute from "@routes/PrivateRoute";
import { UserContext } from "@context/UserProvider";
import DashboardLayout from "@layouts/DashboardLayout";
import RoleBasedRoutes from "@routes/RoleBasedRoutes";
import { darkTheme, lightTheme } from "./theme/theme.ts";
import "./App.scss";

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
