import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { LoadingOverlay } from "@mantine/core";
import { useModals } from '@mantine/modals';

import { Navbar } from "./navbar-folders/Navbar-folders"

import foldersServices from "../../services/foldersServices";

import folderEmpty from "../../images/folder_icon_empty.png";
import addFolderImage from "../../images/addFolder.svg";

import AddFolderForm from "../../components/folders/add-folder-form/AddFolderForm";
import { ErrorMessage } from "../error-message/ErrorMessage";

export const Folders = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));

  const modal = useModals();
  const { userId, folderId } = useParams();

  const [folders, setFolders] = useState([]);
  const [visible, setVisible] = useState(false);

  const [color, setColor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    foldersServices.getFolder(userId, folderId).then((response) => {
      setFolders(folderId ? response.data.folders : response.data.filter(f => f.folder_id === null));
      console.log(folders);
    })
  }, [userId, folderId]);

  const addFolder = (userId, values) => {
    setVisible(true);
    foldersServices.createFolder(userId, folderId, values).then((response) => {
      setFolders(folders.concat(response.data));
      setVisible(false);
    }).catch((error) => {
      if (error.response.status === 422) {
        handleMessage('red', `the folder ${values.name} already exists`)
      }
      setVisible(false);
    });
  };

  const errorStyle = {
    color: color,
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
    textAlign: 'center',
    width:'40%',
    marginLeft:'28%'
  };

  const handleMessage = (color, message) => {
    setColor(color);
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  const openContentModal = () => {
    modal.openModal({
      title: "Choose your folder's name:",
      children: <AddFolderForm userId={userId} onSubmit={addFolder} />
    });
  };

  return (
    <div>
      <Navbar />
      <div className="messageError">
      <LoadingOverlay visible={visible} />
      <ErrorMessage message={errorMessage} style={errorStyle} />
      </div>
      <div className="folderAddButton">
      <button onClick={openContentModal}>
        <img src={addFolderImage} alt=''></img>
      </button>
      </div>
      <div className="wrapper-slider">
        {(folders).map((folder) => {
          return (
            <Link key={folder.id} to={`/users/${user.id}/folders/${folder.id}`}>
              <button>
              <div className="slider">
                <img src={folderEmpty} alt='' />
              <p>{folder.name}</p>
              </div>
              </button>
            </Link>
          )
        })}
      </div>
    </div>
  );
};