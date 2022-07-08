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
import { t } from "i18next";


export const GroupSharing = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [sharedFolders, setSharedFolders] = useState([]);
    const [folders, setFolders] = useState([]);
    const { groupId, userId } = useParams();
    const modal = useModals();

    useEffect(() => {
        foldersServices.getFolderUpload(userId).then((response) => {
          setFolders(response.data);
        });

        folderSharingServices.getSharedFolders(userId, groupId).then((response) => {
            setSharedFolders(response.data)
        })
    }, [userId, groupId, user.id]);

    const addFolderToGroup = (f) => {
        folderSharingServices.addFolderToGroup(groupId, f.id)
        .then(res => {
            setSharedFolders(sharedFolders.concat(res.data.folder));
            toast.success(`${f.name} ${t("group_sharing_success")}`);
            modal.closeModal();
        })
        .catch(err => {
            if (err.response.status === 401) {
                toast.error(`${t("error_401")}`);
            } else if (err.response.status === 403) {
                toast.error(`${t("error_403")}`);
            } else {
                toast.error(`${t("group_folder_already_exists")}`);
            }
        });
    };

    const removeFolderFromGroup = (f) => {
        folderSharingServices.removeFolderFromGroup(groupId, f.id)
        .then(res => {
            toast(`${f.name} ${t("group_sharing_removal_success")}`);
            setSharedFolders(sharedFolders.filter((sharedFolder) => sharedFolder.id !== f.id));
        })
        .catch(err => {
            if (err.response.status === 401) {
                toast.error(`${t("error_401")}`)
            } else if (err.response.status === 403) {
                toast.error(`${t("error_403")}`)
            } else {
                toast.error(`${t("error_404")}`)
            }
        });
    };

    const openContentAddModal = () => {
        modal.openModal({
          children:  
            <ul className="folder-list-groups">
                <h4>
                    {t("group_sharing_choose")}
                </h4>
                {folders.map(folder => {
                    return (
                        <li key={folder.id}> 
                            <br />
                            <img src={folder_icon} alt=''></img>
                            <p> {folder.name} </p>
                            <br />
                            <Button compact onClick={() => addFolderToGroup(folder)}>
                                <img src={add} alt=''></img>
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
       <div>
        <p>{t("group_sharing_title")}</p>
        <Button onClick={() => {openContentAddModal()}}> {t("group_sharing_choose")} </Button>
        </div> 
        <div>
        <Link to={`/users/${user.id}/groups`}>
          <span name="back-groups">
             <p>{t("group_back")}</p>
            </span>
        </Link>
        </div> 
        </div>
        </div>
            <SimpleGrid className="simplegrid-detail-groups" cols={6} spacing='md'>
                {sharedFolders?.map(sharedFolder => {
                    return (
                        <Paper className="paper-details-groups" p='md'radius='md' shadow='xs' withBorder key={sharedFolder.id}>
                            <div className="box-flex-folder-groups">
                            <img src={folderEmpty} alt={`Folder ${sharedFolder.name}`}/>
                            <Text className="txt-folders-groups" align='center' size='lg' weight={500} mt='md'> {sharedFolder.name} </Text>
                            </div>
                            <Button name="button-detail-groups" fullWidth mt='md' onClick={() => removeFolderFromGroup(sharedFolder)}> 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 448 512">
                                <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z" />
                            </svg>
                            </Button>
                        </Paper>
                    )
                })}
            </SimpleGrid>
        </>
    )
}