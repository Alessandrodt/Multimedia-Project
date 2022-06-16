import axios from "./axios";

const createFolder = (id, newFolder ) => {
    return axios.post(`http://smear-backend.test/api/v1/users/${id}/folders`, newFolder);
};

const foldersServices = { createFolder };
export default foldersServices;