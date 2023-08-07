import React, { createContext, useContext, useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
 
  const [displayName, setDisplayName] = useState("");
  const [accessToken, setAccessToken] = useState(() => {
    // Check for an existing token in cookies or session storage
    const storedToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    return storedToken || null;
  });

  const login = async (username, password) => {
    try {
      const response = await api.post("/login", {
        userName: username,
        password: password,
      });

      if (response.status === 200 && response.data.data[0].access_token) {
        const token = response.data.data[0].access_token;
        const displayName = response.data.data[0].project.display_value;
        setDisplayName(displayName);
        console.log(`new token is ${token}`);
        setAccessToken(token);
        sessionStorage.setItem("accesValue", token);
        sessionStorage.setItem("displayName", displayName);
        // Store
        // document.cookie = `accessToken=${response.data.data[0].access_token}; Secure; HttpOnly; SameSite=Strict; Path=/`;
        // console.log("Cookies is..:", document.cookie);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
    setAccessToken(null);
    sessionStorage.removeItem("accesValue");
    sessionStorage.removeItem("displayName");
    // Clear the token from cookies or session storage
    // document.cookie =
    //   "accessToken=; Expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict; Path=/";
    // api.defaults.headers.common["Authorization"] = null;

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
