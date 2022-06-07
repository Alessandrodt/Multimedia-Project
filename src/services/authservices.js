import axios from "axios";

const signupUrl = "http://smear-backend.test/api/v1/users";
const avatarUrl = "http://smear-backend.test/api/v1/avatars";
const loginUrl = "http://smear-backend.test/api/v1/login";

const createUser = (newUser) => {
   return axios.post(signupUrl, newUser);
};

const getAvatar = () => {
   return axios.get(avatarUrl);
};

const getPerson = (person) => {
   return axios.post(loginUrl, person)
}

const authServices = {createUser, getAvatar, getPerson}
export default authServices;