import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { cacheAdapter } from "./cacheAdapter";
// import { setupCache } from "axios-cache-adapter";


const baseURL = "http://43.204.209.147:81/Api";



const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
 });

// api.interceptors.request.use((config) => {
//   const accessToken = cache.get("accessToken");
//   if (accessToken) {
//     config.headers["Authorization"] = `Bearer ${accessToken}`;
//   }
//   return config;
// });

api.interceptors.request.use((config) => {
  // Retrieve the access token from the cookies
  const accessToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  if (accessToken) {
    // Set the Authorization header if the access token is available
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});



api.interceptors.response.use(
  (response) => {
    // Only perform token expiration check for non-login API responses
    if (response.config.url !== "/Api/login") {
      // Check if the API returns a 401 Unauthorized error (token expired)
      if (response.status === 401) {
        // Clear the access token and log the user out
        document.cookie = "accessToken=; Expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict; Path=/";
        // Redirect the user to the login page or perform any other logout logic
        // window.location.replace("/login");
        const navigate = useNavigate();
        navigate("/login");
      }
    }
    return response;
  },
  (error) => {
    // Handle error responses here if needed
    return Promise.reject(error);
  }
);


export default api;
