import axios from "axios";

const signupUrl = "https://localhost:8080/signup";

const createUser = (newUser) => {
   return axios.post(signupUrl, newUser)
}

const authServices = {createUser}
export default authServices;