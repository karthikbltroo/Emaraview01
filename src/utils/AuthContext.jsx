// import React, { createContext, useContext, useEffect, useState } from "react";
// import api from "./api";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [accessToken, setAccessToken] = useState(() => {
//     // Check for an existing token in cookies or session storage
//     const storedToken = document.cookie.replace(
//       /(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/,
//       "$1"
//     );
//     return storedToken || null;
//   });

//   useEffect(() => {
   
//     // Update the axios interceptor whenever the accessToken changes
//     api.interceptors.request.use((config) => {
//       if (accessToken) {
//         config.headers["Authorization"] = `Bearer ${accessToken}`;
//       }
//       return config;
//     });
//   }, [accessToken]);

//   const login = async (username, password) => {
//     try {
//       const response = await api.post("/login", {
//         userName:  username,
//         password: password,

//         // {
//           //         userName: data.username,
//           //         password: data.password,
//           //       },

//       });

//       if (response.status === 200 && response.data.data[0].access_token) {
//         const token = response.data.data[0].access_token;
//         console.log(`new token is ${token}`)
//         setAccessToken(token);
       
//         // Store the token in cookies or session storage
//         document.cookie = `accessToken=${token}; Secure; HttpOnly; SameSite=Strict; Path=/`;
       
//         console.log("Cookies is..:",  document.cookie);
//       } else {
//         throw new Error("Invalid username or password");
//       }
//     } catch (error) {
//       console.error(error);
//       throw new Error("An error occurred during login");
//     }
//   };

//   const logout = () => {
//     setAccessToken(null);
//     // Clear the token from cookies or session storage
//     document.cookie = "accessToken=; Expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict; Path=/";
//   };

//   return (
//     <AuthContext.Provider value={{ accessToken, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export { AuthProvider, useAuth };


import React, { createContext, useContext, useState } from "react";
import api from "./api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
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
        console.log(`new token is ${token}`);
        setAccessToken(token);
sessionStorage.setItem("accesValue",token)
        // Store
        document.cookie = `accessToken=${response.data.data[0].access_token}; Secure; HttpOnly; SameSite=Strict; Path=/`;
        console.log("Cookies is..:", document.cookie);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`; 
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred during login");
    }
  };

  const logout = () => {
    setAccessToken(null);
    // Clear the token from cookies or session storage
    document.cookie =
      "accessToken=; Expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict; Path=/";
    api.defaults.headers.common["Authorization"] = null; 
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
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
