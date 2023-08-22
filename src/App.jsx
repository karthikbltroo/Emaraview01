import React from "react";
import {
  
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate,
  Navigate
} from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import { AuthProvider } from "./utils/AuthContext";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Form_EX201_Excise_Goods_Customs from "./components/Forms/Form_EX201_Excise_Goods_Customs";
import Form_EX202A_Export_Goods_DZ from "./components/Forms/Form_EX202A_Export_Goods_DZ";
import Form_EX202A_Import_DZ from "./components/Forms/Form_EX202A_Import_DZ";
import Form_EX202A_Enter_Goods_DZ from "./components/Forms/Form_EX202A_Enter_Goods_DZ";
import Form_EX202A_Production_DZ from "./components/Forms/Form_EX202A_Production_DZ";
import Form_EX202A_Release_Goods_DZ from "./components/Forms/Form_EX202A_Release_Goods_DZ";
import Form_EX202A_Transfer_Goods_DZ from "./components/Forms/Form_EX202A_Transfer_Goods_DZ";
import Form_EX203B_Lost_Damaged from "./components/Forms/Form_EX203B_Lost_Damaged";
import Form_EX203C_Transfer_of_Ownership from "./components/Forms/Form_EX203C_Transfer_of_Ownership";
import Form_EX203_Deductible from "./components/Forms/Form_EX203_Deductible";
import Report_StockReport from "./components/Reports/Report_StockReport";
import Report_StockByDeclaration from "./components/Reports/Report_StockByDeclaration";
import ReportCC from "./components/Reports/ReportCC";
// import api from "./utils/api";
import PrivateRoutes from "./utils/PrivateRoutes";
import axios from 'axios'

const baseURL = "http://43.204.209.147:81/Api";


// const api = axios.create({
//   baseURL,
//   headers: {
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//   },
// });


axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = localStorage.getItem('accessToken');
  console.log("check this", config, token)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    config.headers['Content-Type'] = 'application/json';
    config.headers['Access-Control-Allow-Origin'] = '*';
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

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


  let navigate = useNavigate();
  let token = localStorage.getItem('accessToken');

  // useEffect(() => {
  //   // Get the token from local storage
  //   const newTokenVal = localStorage.getItem("accessToken");

  //   // If the token is available, set the Authorization header
  //   if (newTokenVal != null) {
  //     api.defaults.headers.common["Authorization"] = `Bearer ${newTokenVal}`;
  //     console.log("Authorization header set with token:", newTokenVal);
  //   }
  // }, []);


  useEffect(() => {
    token = localStorage.getItem('accessToken');
    if (token === null) {
      navigate('/');
      localStorage.clear();
    }
    // else {
    //   navigate('/dashboard');
    // }
  }, [token])

  return (
    <AuthProvider>
    
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginForm />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reports" element={<Reports />}>
              <Route index element={<h2>Please select a report.</h2>} />
              <Route path="Report_StockReport" element={<Report_StockReport />} />
              <Route path="Report_StockByDeclaration" element={<Report_StockByDeclaration />} />
              <Route path="reportCC" element={<ReportCC />} />
            </Route>
            <Route path="/forms" element={<Forms />}>
              <Route index element={<h2>Please select a form.</h2>} />
              <Route
                path="Form_EX201_Excise_Goods_Customs"
                element={<Form_EX201_Excise_Goods_Customs />}
              />
              <Route path="Form_EX202A_Export_Goods_DZ" element={<Form_EX202A_Export_Goods_DZ />} />
              <Route path="Form_EX202A_Import_DZ" element={<Form_EX202A_Import_DZ />} />
              <Route path="Form_EX202A_Enter_Goods_DZ" element={<Form_EX202A_Enter_Goods_DZ />} />
              <Route path="Form_EX202A_Production_DZ" element={<Form_EX202A_Production_DZ />} />
              <Route path="Form_EX202A_Release_Goods_DZ" element={<Form_EX202A_Release_Goods_DZ />} />
              <Route path="Form_EX202A_Transfer_Goods_DZ" element={<Form_EX202A_Transfer_Goods_DZ />} />
              <Route path="Form_EX203B_Lost_Damaged" element={<Form_EX203B_Lost_Damaged />} />
              <Route path="Form_EX203C_Transfer_of_Ownership" element={<Form_EX203C_Transfer_of_Ownership />} />
              <Route path="Form_EX203_Deductible" element={<Form_EX203_Deductible />} />
            </Route>
          </Route>

          {/* Handle unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
 
    </AuthProvider>
  );
};

export default App;
