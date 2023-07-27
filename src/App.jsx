import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Reports from "./components/Reports";
import Logout from "./components/Logout";
import Home from './components/Home'
import DetailedReport from './components/DetailedReport'
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import EmaraForms from "./components/EmaraForms";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { AuthProvider, useAuth } from "./utils/Auth";

const queryClient = new QueryClient();

function App() {
  // const auth=useAuth()
  // console.log(auth)


  return (
    <>
     {/* <QueryClientProvider client={queryClient}>
      <AuthProvider> */}
  
    <Router>
    
    <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/candidates" element={<CandidateDetailsHome />}>
          <Route path="profile" element={<Profile />} />
          <Route path="identityproofs" element={<IdentityProofs/>} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="education" element={<Education />} />
          <Route path="workhistory" element={<Workhistory />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="bankdetails" element={<BankDetails />} />
        </Route> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/reports" element={<Reports />}>
          <Route path=":id" element={<DetailedReport />} /> 
        </Route> */}

<Route path="/reports" element={<Reports />} />
        <Route path="/reports/:id" element={<DetailedReport />} /> 
        <Route path="/logout" element={<Logout />} />
        <Route path="/Emaraforms" element={<EmaraForms />} />
       
      </Routes>
    </Router>
    {/* </AuthProvider>
    </QueryClientProvider> */}
    </>
  );
 
}

export default App;
