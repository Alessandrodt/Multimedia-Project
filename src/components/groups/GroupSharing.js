import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import foldersServices from "../../services/foldersServices";
import folderSharingServices from "../../services/folderSharingServices";
import { Button } from "@mantine/core";

export const GroupSharing = () => {
    const [folders, setFolders] = useState([]);
    const [sharedFolders, setSharedFolders] = useState([]);
    const { userId, groupId } = useParams();
    
    useEffect(() => {
        foldersServices.getFolder(userId).then((response) => {
          setFolders(response.data);
        });
    }, [userId])

    const addFolderToGroup = (f) => {
        folderSharingServices.addFolderToGroup(groupId, f.id)
        .then(res => {
            console.log(`${f.name} is now being shared with this group`);
            setSharedFolders(sharedFolders.concat(res.data));
        })
        .catch(err => {
            if (err.response.status = 401) {
                console.log('User is unauthorized')
            } else if (err.response.status === 403) {
                console.log('This action is forbidden')
            } else {
                console.log('Not found')
            }
        });
    };

    const removeFolderFromGroup = (f) => {
        folderSharingServices.removeFolderFromGroup(groupId, f.id)
        .then(res => {
            console.log(`${f.name} will not be shared with this group anymore`);
            setSharedFolders(res.data);
        })
        .catch(err => {
            if (err.response.status = 401) {
                console.log('User is unauthorized')
            } else if (err.response.status === 403) {
                console.log('This action is forbidden')
            } else {
                console.log('Not found')
            }
        });
    };

    return (
        <>
        <h1> GROUP IMAGE SHARING </h1>
            <h3> This needs to go in a modal </h3>
                <ul>
                    {folders.map(folder => {
                        return (
                            <li key={folder.id}> 
                                <br />
                                <p> {folder.name} ( FId = {folder.id} ) </p>
                                <br />
                                <Button compact onClick={() => addFolderToGroup(folder)}> Add to Group </Button> 
                                <Button compact onClick={() => removeFolderFromGroup(folder)}> Remove from Group </Button>
                                <br />
                            </li>
                        );
                    })}
                </ul>
            <h3> This is the section where you should see if a folder is added or not but we don't have the facilities for this </h3>
                <ul>
                    {}
                </ul>
        </>
    )
}