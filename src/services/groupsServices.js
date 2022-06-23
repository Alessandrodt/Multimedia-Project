import axios from "../services/axios";

// Method to retrieve the groups created by the user from the backend.
const getUserGroups = (id) => {
    return axios.get(`https://smi-laravel.fly.dev/api/v1/users/${id}/groups`);
    
};

// Method to create an empty group on the backend.
const createGroup = (id, newGroup) => {
    return axios.post(`https://smi-laravel.fly.dev/api/v1/users/${id}/groups`, newGroup);
};

// Method to search a user via their email address.
const searchUser = (email) => {
    return axios.get(`https://smi-laravel.fly.dev/api/v1/users`, email);
};

// Method to add user to the group. 
const addUser = (group, user) => {
    return axios.post(`https://smi-laravel.fly.dev/api/v1/groups/${group}/users/${user}`);
};

const groupsServices = { getUserGroups, createGroup, searchUser, addUser };

export default groupsServices;
