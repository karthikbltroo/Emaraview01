import axios from "axios";
import { useNavigate } from "react-router-dom";



const baseURL = "http://43.204.209.147:81/Api";



let newTokenVal = sessionStorage.getItem("accesValue")
console.log("token is from api.js", newTokenVal)

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
  let newTokenVal = sessionStorage.getItem("accesValue")

  // if (accessToken) {
  //   // Set the Authorization header if the access token is available
  //   config.headers["Authorization"] = `Bearer ${accessToken}`;
  // }

  if (newTokenVal !=null){
    api.defaults.headers.common["Authorization"] = `Bearer ${newTokenVal}`; 
    console.log('testing...')
  }

  return config;
});



api.interceptors.response.use(
  (response) => {
    // Only perform token expiration check for non-login API responses
    if (response.config.url !== "/login") {
      // Check if the API returns a 401 Unauthorized error (token expired)
      if (response.status === 401) {
         // Redirect the user to the login page or perform any other logout logic
        // window.location.replace("/login");
        const navigate = useNavigate();
        navigate("/login");
        sessionStorage.removeItem("accesValue");
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
