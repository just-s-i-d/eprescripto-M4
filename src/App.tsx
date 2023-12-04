import { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ConfigProvider, Spin } from "antd";

import PrivateRoute from "@routes/PrivateRoute";
import DashboardLayout from "@layouts/DashboardLayout";
import { darkTheme, lightTheme } from "./theme/theme.js";
import { UserContext } from "@context/UserProvider";
import RoleBasedRoutes from "@routes/RoleBasedRoutes";
import "./App.css";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [spinnng, setSpinning] = useState(false);
  const [role, setRole] = useState("");
  const userContext = useContext(UserContext);

  if (userContext === null) setSpinning(true);
  else setRole(userContext.role);

  return (
    <ConfigProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Spin spinning={spinnng}>
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
      </Spin>
    </ConfigProvider>
  );
}

export default App;
