import React, { createContext, useContext, useState, useEffect } from "react";
// import api from "./api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PATHS } from "../apiURL";

// const baseURL = "http://43.204.209.147:81/Api"
const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  // const [accessToken, setAccessToken] = useState("");
  // const [displayName, setDisplayName] = useState("");

  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || "");
  const [displayName, setDisplayName] = useState(localStorage.getItem("displayName") || "");



  const login = async (username, password) => {
    try {
      const response = await axios.post(`${PATHS.LOGIN}`, {
        userName: username,
        password: password,
      });

      if (response.status === 200 && response.data.data[0].access_token) {
        const token = response.data.data[0].access_token;
        const displayName = response.data.data[0].project.display_value;
    
        setAccessToken(token);
        setDisplayName(displayName);
        console.log(`new token 22222 ${accessToken}`);

        // Store token and display name in local storage
        localStorage.setItem("accessToken", token);
        localStorage.setItem("displayName", displayName);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
       
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Return the error response if it's a 401 error
        return error.response.data;
      }
    }
  };

  const logout = (navigate) => {

    localStorage.removeItem("accessToken");
  localStorage.removeItem("displayName");
 
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, displayName }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
