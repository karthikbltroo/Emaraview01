// import { useState } from "react";
// import Navbar from "./components/Navbar";
// import Dashboard from "./components/Dashboard";
// import Profile from "./components/Profile";
// import Reports from "./components/Reports";
// import Logout from "./components/Logout";
// import LoginForm from "./components/LoginForm";
// import DetailedReport from "./components/DetailedReport";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   Outlet,
//   useLocation
// } from "react-router-dom";
// import EmaraForms from "./components/EmaraForms";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { AuthProvider } from "./utils/AuthContext";

// const queryClient = new QueryClient();

// function App() {
//   // const auth=useAuth()
//   // console.log(auth)

//   return (
//     <>
//     <AuthProvider>
//       <Router>
//       <Navbar />
//         {/* <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/reports" element={<Reports />} />
//           <Route path="/reports/:id" element={<DetailedReport />} />
//           <Route path="/logout" element={<Logout />} />
//           <Route path="/Emaraforms" element={<EmaraForms />} />
//         </Routes> */}

// <Routes>
//           <Route path="/" element={<LoginForm />} />
//           {/* Add other routes that should not have the Navbar */}
//           <Route index element={<Outlet />}>
//             {/* All the child routes will have the Navbar */}
//             <Route path="/profile" element={<Profile />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/reports" element={<Reports />} />
//           <Route path="/reports/:id" element={<DetailedReport />} />
//           <Route path="/logout" element={<Logout />} />
//           <Route path="/Emaraforms" element={<EmaraForms />} />
//             {/* Add other routes with the Navbar */}
//           </Route>
//         </Routes>


//       </Router>
//       </AuthProvider>
//     </>
//   );
// }

// export default App;



// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";
// import Navbar from "./components/Navbar"
// import { AuthProvider } from "./utils/AuthContext";

// const Dashboard = () => <div>Dashboard Page</div>;
// const Reports = () => <div>Reports Page<Outlet /></div>;
// const ReportAA = () => <div>Report AA Page</div>;
// const ReportBB = () => <div>Report BB Page</div>;
// const ReportCC = () => <div>Report CC Page</div>;
// const Forms = () => <div>Forms Page<Outlet /></div>;
// const FormAA = () => <div>Form AA Page</div>;
// const FormBB = () => <div>Form BB Page</div>;
// const FormCC = () => <div>Form CC Page</div>;
// const Logout = () => <div>Logout Page</div>;
// const Login = () => <div>Login Page</div>;

// const App = () => {
//   return (
//     <AuthProvider>
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/reports" element={<Reports />}>
//           <Route index element={<h2>Please select a report.</h2>} />
//           <Route path="reportAA" element={<ReportAA />} />
//           <Route path="reportBB" element={<ReportBB />} />
//           <Route path="reportCC" element={<ReportCC />} />
//         </Route>
//         <Route path="/forms" element={<Forms />}>
//           <Route index element={<h2>Please select a form.</h2>} />
//           <Route path="formAA" element={<FormAA />} />
//           <Route path="formBB" element={<FormBB />} />
//           <Route path="formCC" element={<FormCC />} />
//         </Route>
//         <Route path="/logout" element={<Logout />} />
//       </Routes>
//     </Router>
//     </AuthProvider>
//   );
// };

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import { AuthProvider } from "./utils/AuthContext";
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import FormsAA from './components/Forms/FormsAA'
import FormsBB from './components/Forms/FormsBB'
import FormsCC from './components/Forms/FormsCC'
import Report_EX201_Excise_Goods_Customs from "./components/Reports/Report_EX201_Excise_Goods_Customs";
import ReportBB from "./components/Reports/ReportBB";
import ReportCC from "./components/Reports/ReportCC";
import api from './utils/api'






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
  let newTokenVal = sessionStorage.getItem("accesValue")
  console.log("token is", newTokenVal)


useEffect(()=>{
  if (newTokenVal !=null){
    api.defaults.headers.common["Authorization"] = `Bearer ${newTokenVal}`; 
    console.log('testing...')
  }
},[newTokenVal])

  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reports" element={<Reports />}>
          <Route index element={<h2>Please select a report.</h2>} />
          <Route path="Report_EX201_Excise_Goods_Customs" element={<Report_EX201_Excise_Goods_Customs />} />
          <Route path="reportBB" element={<ReportBB />} />
          <Route path="reportCC" element={<ReportCC />} />
        </Route>
        <Route path="/forms" element={<Forms />}>
          <Route index element={<h2>Please select a form.</h2>} />
          <Route path="formAA" element={<FormsAA />} />
          <Route path="formBB" element={<FormsBB />} />
          <Route path="formCC" element={<FormsCC />} />
        </Route>
        {/* <Route path="/logout" element={<Logout />} /> */}
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;

