import axios from './axios';

const addFolderToGroup = (groupId, folderID) => {
 /**
 * This method is used to link a Folder instance to a Group one, allowing it to be shared.
 * @param {string} groupId - The group id, retrieved through the useParams hook.
 * @param {string} folderId - The folder id, retrieved through the useParams hook.
 * @returns A folder instance.
 */
    return axios.post(`https://smi-laravel.fly.dev/api/v1/groups/${groupId}/folders/${folderID}`)
}

const removeFolderFromGroup = (groupId, folderID) => {
 /**
 * This method is used to sever the link a Folder instance to a Group one, allowing it to be shared.
 * @param {string} groupId - The group id, retrieved through the useParams hook.
 * @param {string} folderId - The folder id, retrieved through the useParams hook.
 * @returns The response is not used in the function that calls this method.
 */
    return axios.delete(`https://smi-laravel.fly.dev/api/v1/groups/${groupId}/folders/${folderID}`)
}

const getSharedFolders = (userId, groupId) => {
 /**
 * This method is used to get the folders that are linked in a given Group instance.
 * @param {string} groupId - The group id, retrieved through the useParams hook.
 * @param {string} folderId - The folder id, retrieved through the useParams hook.
 * @returns An array of folder instances.
 */
    return axios.get(`https://smi-laravel.fly.dev/api/v1/users/${userId}/folders?filter[groups]=${groupId}&include=folders,groups,groups.users`);
}

const folderSharingServices = { addFolderToGroup, removeFolderFromGroup, getSharedFolders }

export default folderSharingServices