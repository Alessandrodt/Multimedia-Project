// React imports
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Mantine imports
import { useModals } from "@mantine/modals";
import { Button, Paper, SimpleGrid, Text } from "@mantine/core";

// Services imports
import foldersServices from "../../services/foldersServices";
import folderSharingServices from "../../services/folderSharingServices";

// Style imports
import folderEmpty from "../../images/folder_icon_empty.svg";
import { messageHandler } from "../../functions/messageHandler";


export const GroupSharing = () => {
    const [sharedFolders, setSharedFolders] = useState([]);
    const [folders, setFolders] = useState([]);
    const { groupId, userId } = useParams();
    const modal = useModals();

    useEffect(() => {
        foldersServices.getFolder(userId).then((response) => {
          setFolders(response.data);
        });
    }, [userId]);

    const addFolderToGroup = (f) => {
        folderSharingServices.addFolderToGroup(groupId, f.id)
        .then(res => {
            console.log(res)
            console.log(`${f.name} is now being shared with this group`);
            messageHandler('success', `${f.name} is now being shared with this group`)
            setSharedFolders(sharedFolders.concat(res.data));
            modal.closeModal();
        })
        .catch(err => {
            if (err.response.status === 401) {
                messageHandler('error', 'User is unauthorized')
            } else if (err.response.status === 403) {
                console.log('This action is forbidden')
            } else {
                console.log('Not found')
            }
        });
    };
    console.log(sharedFolders);

    const removeFolderFromGroup = (f) => {
        folderSharingServices.removeFolderFromGroup(groupId, f.folder.id)
        .then(res => {
            console.log(res)
            console.log(`${f.folder.name} will not be shared with this group anymore`);
            setSharedFolders(sharedFolders.filter((sharedFolder) => sharedFolder.folder.id !== f.folder.id));
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
                            <br />
                        </li>
                    );
                })}
            </ul>,
        });
      };

    return (
        <>
        <h1> GROUP IMAGE SHARING </h1>
        <Button onClick={() => {openContentAddModal()}}> Choose Folders </Button>
            <h3> This is the section where you should see if a folder is added or not but we don't have the facilities for this </h3>
            <SimpleGrid cols={5} spacing='md'>
                {sharedFolders?.map(sharedFolder => {
                    return (
                        <Paper p='md'radius='md' shadow='xs' withBorder key={sharedFolder.folder.id}>
                            <img src={folderEmpty} />
                            <Text align='center' size='lg' weight={500} mt='md'> {sharedFolder.folder.name} </Text>
                            <Button fullWidth mt='md' onClick={() => removeFolderFromGroup(sharedFolder)}> Remove from Group </Button>
                        </Paper>
                    )
                })}
            </SimpleGrid>
        </>
    )
}