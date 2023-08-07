import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
Navigate
} from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import { AuthProvider } from "./utils/AuthContext";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Form_EX201_Excise_Goods_Customs from "./components/Forms/Form_EX201_Excise_Goods_Customs";
import FormsBB from "./components/Forms/FormsBB";
import FormsCC from "./components/Forms/FormsCC";
import ReportAA from "./components/Reports/ReportAA";
import ReportBB from "./components/Reports/ReportBB";
import ReportCC from "./components/Reports/ReportCC";
import api from "./utils/api";
import PrivateRoutes from "./utils/PrivateRoutes";

const Reports = () => (
  <div>
    {/* <h2>Please select a report.</h2> */}
    <Outlet />
  </div>
);

const Forms = () => (
  <div>
    {/* <h2>Please select a form.</h2> */}
    <Outlet />
  </div>
);

const App = () => {
  let newTokenVal = sessionStorage.getItem("accesValue");
  console.log("token is", newTokenVal);

  useEffect(() => {
    if (newTokenVal != null) {
      api.defaults.headers.common["Authorization"] = `Bearer ${newTokenVal}`;
      console.log("testing...");
    }
  }, [newTokenVal]);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginForm />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reports" element={<Reports />}>
              <Route index element={<h2>Please select a report.</h2>} />
              <Route path="reportAA" element={<ReportAA />} />
              <Route path="reportBB" element={<ReportBB />} />
              <Route path="reportCC" element={<ReportCC />} />
            </Route>
            <Route path="/forms" element={<Forms />}>
              <Route index element={<h2>Please select a form.</h2>} />
              <Route
                path="Form_EX201_Excise_Goods_Customs"
                element={<Form_EX201_Excise_Goods_Customs />}
              />
              <Route path="formBB" element={<FormsBB />} />
              <Route path="formCC" element={<FormsCC />} />
            </Route>
          </Route>

          {/* Handle unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
