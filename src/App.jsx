import { useState } from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Reports from "./components/Reports";
import Logout from "./components/Logout";
import Home from './components/Home'
import DetailedReport from './components/DetailedReport'
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import EmaraForms from "./components/EmaraForms";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const handleLogin = () => {
     setIsLoggedIn(true);
  };
  return (
    <>
  
    <Router>
    {isLoggedIn && <Navbar />}
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
    </>
  );
 
}

export default App;
