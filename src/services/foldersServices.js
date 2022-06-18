import axios from "./axios";

const createFolder = (userId, folderId, newFolder) => {
    let url = `http://smear-backend.test/api/v1/users/${userId}/folders`;

    if (folderId) {
        url.concat(folderId);
    }

    return axios.post(url, newFolder);
};

const getFolder = (userId, folderId) => {
    let url = `http://smear-backend.test/api/v1/users/${userId}/folders/${folderId}?include=folders`;

    if (folderId) {
        url.concat(folderId);
    }
    
    return axios.get(url);
};

const foldersServices = { createFolder, getFolder };

export default foldersServices;