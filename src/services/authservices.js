import axios from "axios";

const signupUrl = " https://media-backend.fly.dev/signup";

const createUser = (newUser) => {
   return axios.post(signupUrl, newUser)
}

const authServices = {createUser}
export default authServices;