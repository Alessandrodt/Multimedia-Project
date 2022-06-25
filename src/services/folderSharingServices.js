import axios from "axios";

const addFolderToGroup = (groupID, folderID) => {
    return axios.post(`https://smi-laravel.fly.dev/api/v1/groups/${groupID}/folders/${folderID}`)
}

const removeFolderFromGroup = (groupID, folderID) => {
    return axios.delete(`https://smi-laravel.fly.dev/api/v1/groups/${groupID}/folders/${folderID}`)
}

const folderSharingServices = { addFolderToGroup, removeFolderFromGroup }

export default folderSharingServices