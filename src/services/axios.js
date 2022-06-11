import axios from "axios";
import { useNavigate } from "react-router-dom";

// Standard axios instance creation
const axiosInstance = axios.create({
  baseURL: 'http://smear-backend.test/api/v1/login'
});


// This function is responsible for assigning the auth token found in the sessionStorage
// to the request, enabling the guard functionality.
axiosInstance.interceptors.request.use(function (req) {
  let token = sessionStorage.getItem('Auth Token');

  if (token) {
    req.headers["Authorization"] = "Bearer " + token;
  }

  return req;
});

// This function checks the presence of the token, responding with a status code 401
// if the token is not present. This redirects the user to the login page.

/** @todo Add a control to the if block to check the user's current route */
axiosInstance.interceptors.response.use(function (res) {
  if (res.status === 401) {
    useNavigate()('/');
  }

  return res;
});

export default axiosInstance;