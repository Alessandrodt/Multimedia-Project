import axios from "axios";

const addFolderToGroup = (groupId, folderID) => {
    return axios.post(`https://smi-laravel.fly.dev/api/v1/groups/${groupId}/folders/${folderID}`)
}

const removeFolderFromGroup = (groupId, folderID) => {
    return axios.delete(`https://smi-laravel.fly.dev/api/v1/groups/${groupId}/folders/${folderID}`)
}

const folderSharingServices = { addFolderToGroup, removeFolderFromGroup }

export default folderSharingServices