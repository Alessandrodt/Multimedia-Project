import axios from "axios";

const signupUrl = "http://smear-backend.test/api/v1/users";
const loginUrl = "http://smear-backend.test/api/v1/login";

const confirmUser = (id, hash) => {
  return axios.patch(`http://smear-backend.test/api/v1/users/${id}/verify`, {
    hash,
  });
};

const createUser = (newUser) => {
  return axios.post(signupUrl, newUser);
};

const getUser = (user) => {
  return axios.post(loginUrl, user);
};

const authServices = { confirmUser, createUser, getUser };
export default authServices;
