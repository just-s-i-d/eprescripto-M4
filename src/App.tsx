import { Routes, Route } from "react-router-dom";

import "./App.css";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
