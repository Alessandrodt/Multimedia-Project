import axios from "./axios";

const createFolder = (userId, folderId, newFolder) => {
    let url = `http://smi-laravel.fly.dev/api/v1/users/${userId}/folders`;

    if (folderId) {
        url = url.concat(`/${folderId}?include=folders`);
    }

    return axios.post(url, newFolder);
};

const editFolder = (userId, folderId, newFolder) => {
    return axios.put(`http://smi-laravel.fly.dev/api/v1/users/${userId}/folders/${folderId}`, newFolder);
};

const getFolder = (userId, folderId) => {
    let url = `http://smi-laravel.fly.dev/api/v1/users/${userId}/folders/`;

    if (folderId) {
        url = url.concat(`${folderId}?include=folders`);
    }

    return axios.get(url);
};


const foldersServices = { createFolder, editFolder, getFolder };

export default foldersServices;