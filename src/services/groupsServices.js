import axios from "../services/axios";


const getUserGroups = (id) => {
 /**
 *  This method is used to retrieve groups where an user is present.
 * @param {string} id - User id, retrieved from the user object in the sessionStorage.
 * @returns An array of Group object instances.
 */
    return axios.get(`https://smi-laravel.fly.dev/api/v1/users/${id}/groups`);
};

const createGroup = (id, newGroup) => {
 /**
 *  This method is used to create a Group instance on the backend.
 * @param {string} id - User id, retrieved from the user object in the sessionStorage.
 * @param {object} newGroup - A group instance, with a single key 'name'.
 * @returns A single new Group instance.
 */
    return axios.post(`https://smi-laravel.fly.dev/api/v1/users/${id}/groups`, newGroup);
};

const searchUser = (email) => {
 /**
 * Method to search a user via their email address. The email param is filtered in the backend.
 * @param {string} email - User email, retrieved from e.currentTarget.value in the Searchbar text input.
 * @returns An array of User objects.
 */
    return axios.get(`https://smi-laravel.fly.dev/api/v1/users`, email);
};

const addUser = (group, user) => {
 /**
 * Method to add an user to the group. 
 * @param {string} group - The group id, retrieved through the useParams hook.
 * @param {string} user - User id, retrieved from the user object in the sessionStorage. 
 * @returns A user istance.
 */
    return axios.post(`https://smi-laravel.fly.dev/api/v1/groups/${group}/users/${user}`);
};

const deleteUser = (group, user) => {
    return axios.delete(`https://smi-laravel.fly.dev/api/v1/groups/${group}/users/${user}`)
}

const getAllGroups = () => {
    return axios.get(`https://smi-laravel.fly.dev/api/v1/users/1/folders?filter[groups]=14&include=folders,groups,groups.users`)
}

const groupsServices = { getUserGroups, createGroup, searchUser, addUser, deleteUser, getAllGroups };

export default groupsServices;
