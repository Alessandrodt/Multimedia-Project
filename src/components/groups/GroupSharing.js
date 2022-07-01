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
import toast from "react-hot-toast";
import groupsServices from "../../services/groupsServices";


export const GroupSharing = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [sharedFolders, setSharedFolders] = useState([]);
    const [groupsIds, setGroupsId] = useState([]);
    const [folders, setFolders] = useState([]);
    const { groupId, userId } = useParams();
    const modal = useModals();

    useEffect(() => {
        groupsServices.getUserGroups(user.id)
        .then(groups => {
            const gId = groups.data.map(group => group.id)
            setGroupsId(gId)
        });

        foldersServices.getFolder(userId).then((response) => {
          setFolders(response.data);
        });

        folderSharingServices.getSharedFolders(userId, groupsIds).then((response) => {
            console.log(response.data)
            setSharedFolders(response.data)
        })
    }, [userId]);

    const addFolderToGroup = (f) => {
        folderSharingServices.addFolderToGroup(groupId, f.id)
        .then(res => {
            console.log(res)
            console.log(`${f.name} is now being shared with this group`);
            toast.success(`${f.name} is now being shared with this group`);
            setSharedFolders(sharedFolders.concat(res.data));
            modal.closeModal();
        })
        .catch(err => {
            if (err.response.status === 401) {
                toast.error('User is unauthorized');
            } else if (err.response.status === 403) {
                toast.error('This action is forbidden');
            } else {
                toast.error('Not found');
            }
        });
    };

    const removeFolderFromGroup = (f) => {
        folderSharingServices.removeFolderFromGroup(groupId, f.folder.id)
        .then(res => {
            toast(`${f.folder.name} will not be shared with this group anymore`);
            setSharedFolders(sharedFolders.filter((sharedFolder) => sharedFolder.folder.id !== f.folder.id));
        })
        .catch(err => {
            if (err.response.status === 401) {
                toast.error('User is unauthorized')
            } else if (err.response.status === 403) {
                toast.error('This action is forbidden')
            } else {
                toast.error('Not found')
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
                            <p> {folder.name} </p>
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
                        <Paper p='md'radius='md' shadow='xs' withBorder key={sharedFolder.id}>
                            <img src={folderEmpty} alt={`Folder ${sharedFolder.name}`}/>
                            <Text align='center' size='lg' weight={500} mt='md'> {sharedFolder.name} </Text>
                            <Button fullWidth mt='md' onClick={() => removeFolderFromGroup(sharedFolder)}> Remove from Group </Button>
                        </Paper>
                    )
                })}
            </SimpleGrid>
        </>
    )
}