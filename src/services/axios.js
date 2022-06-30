import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

// window could be omitted but React throws an error.
const currentLocation = window.location;
// Standard axios instance creation
const axiosInstance = axios.create({
  baseURL: "https://smi-laravel.fly.dev/api/v1/login",
});

// This function is responsible for assigning the auth token found in the sessionStorage
// to the request, enabling the guard functionality.
axiosInstance.interceptors.request.use(function (req) {
  let token = sessionStorage.getItem("Auth Token");

  req.headers['Access-Control-Allow-Origin'] = '*';
  req.headers['Content-Type'] = 'application/json';

  if (token) {
    req.headers["Authorization"] = "Bearer " + token;
  }

  return req;
});

// This function checks the presence of the token, responding with a status code 401
// if the token is not present. This redirects the user to the login page.
// window.location.pathname is suboptimal and should not be used
axiosInstance.interceptors.response.use(function (res) {
  if (res.status === 401 && currentLocation.pathname !== "/") {
    currentLocation.reload()
    toast('Please authenticate yourself.')
  }
  return res;
});

export default axiosInstance;
