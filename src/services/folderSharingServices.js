import axios from './axios';

const addFolderToGroup = (groupId, folderID) => {
    return axios.post(`https://smi-laravel.fly.dev/api/v1/groups/${groupId}/folders/${folderID}`)
}

const removeFolderFromGroup = (groupId, folderID) => {
    return axios.delete(`https://smi-laravel.fly.dev/api/v1/groups/${groupId}/folders/${folderID}`)
}

const getSharedFolders = (userId, groupId) => {
    return axios.get(`https://smi-laravel.fly.dev/api/v1/users/${userId}/folders?filter[groups]=${groupId}&include=folders,groups,groups.users`);
}


// https://smi-laravel.fly.dev/api/v1/users/${userId}/folders?filter[groups]=${groupsIds}
const folderSharingServices = { addFolderToGroup, removeFolderFromGroup, getSharedFolders }

export default folderSharingServices