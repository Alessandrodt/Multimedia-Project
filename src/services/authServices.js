import axios from "./axios";

const signupUrl = "https://smi-laravel.fly.dev/api/v1/users";
const loginUrl = "https://smi-laravel.fly.dev/api/v1/login";

const confirmUser = (id, hash) => {
  return axios.patch(`https://smi-laravel.fly.dev/api/v1/users/${id}/verify`, {
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
