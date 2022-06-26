import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import foldersServices from "../../services/foldersServices";
import folderSharingServices from "../../services/folderSharingServices";
import { Button } from "@mantine/core";

export const GroupSharing = () => {
    const [folders, setFolders] = useState([]);
    const { userId, groupId } = useParams();
    
    useEffect(() => {
        foldersServices.getFolder(userId).then((response) => {
          setFolders(response.data);
        });
    }, [userId])

    const addFolderToGroup = (folderId) => {
        folderSharingServices.addFolderToGroup(groupId, folderId)
        .then(res => {
            console.log(res.data);
        });
    }

    return (
        <>
        <h1> GROUP IMAGE SHARING </h1>
            <h2> You should be able to only see the folders YOU are sharing to others in this section </h2>
                <ul>
                    {folders.map(folder => {
                        return (
                            <li key={folder.id}> 
                                <br />
                                <p> {folder.name} ( FId = {folder.id} ) </p>
                                <br />
                                <Button compact onClick={() => addFolderToGroup(folder.id)}> Add to Group </Button> <Button compact> Remove from Group </Button>
                                <br />
                            </li>
                        );
                    })}
                </ul>
        </>
    )
}