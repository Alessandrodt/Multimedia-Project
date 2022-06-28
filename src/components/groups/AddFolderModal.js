import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useModals } from "@mantine/modals";
import { Button } from "@mantine/core";

import foldersServices from "../../services/foldersServices";
import folderSharingServices from "../../services/folderSharingServices";

export const AddFolderModal = ( sharedFolders, setSharedFolders ) => {
    const [folders, setFolders] = useState([]);
    const { groupId, userId } = useParams();
    const modal = useModals();

    useEffect(() => {
        foldersServices.getFolder(userId).then((response) => {
          setFolders(response.data);
        });
    }, [userId]);

    const shFolders = sharedFolders;
    const addFolderToGroup = (f) => {
        folderSharingServices.addFolderToGroup(groupId, f.id)
        .then(res => {
            console.log(`${f.name} is now being shared with this group`);
            setSharedFolders(shFolders.concat(res.data));
            console.log(shFolders);
        })
        .catch(err => {
            if (err.response.status === 401) {
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
            if (err.response.status === 401) {
                console.log('User is unauthorized')
            } else if (err.response.status === 403) {
                console.log('This action is forbidden')
            } else {
                console.log('Not found')
            }
        });
    };

    const openContentAddModal = () => {
        modal.openModal({
          title: "Choose your folder's name:",
          children:  
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
            </ul>,
        });
      };

    return (
        <Button onClick={() => {openContentAddModal()}}> Choose Folders </Button>
    )
}