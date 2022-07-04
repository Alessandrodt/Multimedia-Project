// React imports
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// Mantine imports
import { useModals } from "@mantine/modals";
import { Button, Paper, SimpleGrid, Text } from "@mantine/core";

// Services imports
import foldersServices from "../../services/foldersServices";
import folderSharingServices from "../../services/folderSharingServices";

// Style imports
import folderEmpty from "../../images/folder_icon_empty.svg";
import toast from "react-hot-toast";
import { NavbarGroups } from "./navbar-groups/NavbarGroups";

import add from "../../images/add.svg"
import folder_icon from "../../images/folder_icon.svg"


export const GroupSharing = () => {
    const [sharedFolders, setSharedFolders] = useState([]);
    const user = JSON.parse(sessionStorage.getItem('user'));
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
          title: "Choose folder",
          children:  
            <ul className="folder-list-groups">
                {folders.map(folder => {
                    return (
                        <li key={folder.id}> 
                            <br />
                            <img src={folder_icon}></img>
                            <p> {folder.name} </p>
                            <br />
                            <Button compact onClick={() => addFolderToGroup(folder)}>
                                <img src={add}></img>
                            </Button> 
                            <br />
                        </li>
                    );
                })}
            </ul>,
        });
      };

    return (
        <>
        <NavbarGroups/>
        <div className="back-box-groups">
        <div className="share-box-groups">
        <h3>Condividi con i tuoi amici</h3>
        <Button onClick={() => {openContentAddModal()}}> Choose Folders </Button>
        </div>
        <div className="back-group">
        <Link to={`/users/${user.id}/groups`}>
          <span>
             <p>Indietro</p>
            </span>
        </Link>
        </div>
        </div>
            <SimpleGrid cols={5} spacing='md'>
                {sharedFolders?.map(sharedFolder => {
                    return (
                        <Paper p='md'radius='md' shadow='xs' withBorder key={sharedFolder.folder.id}>
                            <img src={folderEmpty} alt={`Folder ${sharedFolder.folder.name}`}/>
                            <Text align='center' size='lg' weight={500} mt='md'> {sharedFolder.folder.name} </Text>
                            <Button fullWidth mt='md' onClick={() => removeFolderFromGroup(sharedFolder)}> Remove from Group </Button>
                        </Paper>
                    )
                })}
            </SimpleGrid>
        </>
    )
}