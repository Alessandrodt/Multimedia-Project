import axios from "./axios";

const createFolder = (id, newFolder) => {
    return axios.post(`http://smear-backend.test/api/v1/users/${id}/folders`, newFolder);
};

const getFolder = (id) => {
    return axios.get(`http://smear-backend.test/api/v1/users/${id}/folders`);
}
const foldersServices = { createFolder, getFolder };
export default foldersServices;