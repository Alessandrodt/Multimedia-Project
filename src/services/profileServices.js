import axios from './axios';

const getUser = (id) => {
    return axios.get(`http://smear-backend.test/api/v1/users/${id}`);
};

const profileServices = { getUser };
export default profileServices;