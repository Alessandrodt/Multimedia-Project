import axios from "./axios";

const createFolder = (userId, folderId, newFolder) => {
  let url = `https://smi-laravel.fly.dev/api/v1/users/${userId}/folders`;

  if (folderId) {
    url = url.concat(`/${folderId}`);
  }

  return axios.post(url, newFolder);
};

const editFolder = (userId, folderId, updatedFolder) => {
  return axios.put(
    `https://smi-laravel.fly.dev/api/v1/users/${userId}/folders/${folderId}`,
    updatedFolder
  );
};

const getFolder = (userId, folderId) => {
  let url = `https://smi-laravel.fly.dev/api/v1/users/${userId}/folders/`;

  if (folderId) {
    url = url.concat(`${folderId}?include=folders`);
  } else {
    url = url.concat(`?filter[folder_id]=null`);
  }

  return axios.get(url);
};

const getFolderUpload = (userId) => {
  return axios.get(`https://smi-laravel.fly.dev/api/v1/users/${userId}/folders/`);
};

const foldersServices = { createFolder, editFolder, getFolder, getFolderUpload };

export default foldersServices;
