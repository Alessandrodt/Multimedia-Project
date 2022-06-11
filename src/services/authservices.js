import axios from './axios';

const signupUrl = "http://smear-backend.test/api/v1/users";
const avatarUrl = "http://smear-backend.test/api/v1/avatars";
const loginUrl = "http://smear-backend.test/api/v1/login";

const confirmUser = (id, hash) => {
   return axios.patch(`http://smear-backend.test/api/v1/users/${id}/verify`, {hash});
};

const createUser = (newUser) => {
   return axios.post(signupUrl, newUser);
};

const getAvatar = () => {
   return axios.get(avatarUrl);
};

const getPerson = (person) => {
   return axios.post(loginUrl, person)
};

const authServices = {createUser, getAvatar, getPerson, confirmUser};
export default authServices;