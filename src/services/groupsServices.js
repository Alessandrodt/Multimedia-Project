import axios from "../services/axios";

// Method to retrieve the groups created by the user from the backend.
const getUserGroups = (id) => {
    return axios.get(`http://smear-backend.test/api/v1/users/${id}/groups`);
    
};

// Method to create an empty group on the backend.
const createGroup = (id, newGroup) => {
    return axios.post(`http://smear-backend.test/api/v1/users/${id}/groups`, newGroup);
};

// Method to search a user via their email address.
const searchUser = () => {
    return;
};

const groupsServices = { getUserGroups, createGroup, searchUser };

export default groupsServices;