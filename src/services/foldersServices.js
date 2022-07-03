import axios from "./axios";

const createFolder = (userId, folderId, newFolder) => {
    let url = `http://smi-laravel.fly.dev/api/v1/users/${userId}/folders`;

    if (folderId) {
        url = url.concat(`/${folderId}`);
    }

    return axios.post(url, newFolder);
};

const editFolder = (userId, folderId, updatedFolder) => {
    return axios.put(`http://smi-laravel.fly.dev/api/v1/users/${userId}/folders/${folderId}`, updatedFolder);
};

const getFolder = (userId, folderId) => {
    let url = `http://smi-laravel.fly.dev/api/v1/users/${userId}/folders/`;

    if (folderId) {
        url = url.concat(`${folderId}?include=folders`);
    } else {
        url = url.concat(`?filter[folder_id]=null`)
    }

    return axios.get(url);
};

const foldersServices = { createFolder, editFolder, getFolder };

export default foldersServices;