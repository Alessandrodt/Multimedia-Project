import axios from "./axios";

const getUser = (id) => {
  return axios.get(`https://smi-laravel.fly.dev/api/v1/users/${id}`);
};

const profileServices = { getUser };
export default profileServices;
