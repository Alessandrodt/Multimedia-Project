import axios from "axios";

const signupUrl = "http://smear-backend.test/api/v1/users";
const avatarUrl = "http://smear-backend.test/api/v1/avatars";

const createUser = (newUser) => {
   return axios.post(signupUrl, newUser);
};

const getAvatar = () => {
   return axios.get(avatarUrl);
};

const authServices = {createUser, getAvatar}
export default authServices;