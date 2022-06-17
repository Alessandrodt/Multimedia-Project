import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useModals } from '@mantine/modals';

import { Navbar } from "./navbar-folders/Navbar-folders"

import foldersServices from "../../services/foldersServices";

import folderEmpty from "../../images/folder_icon_empty.png";
import addFolderImage from "../../images/addFolder.svg"

import { ErrorMessage } from "../error-message/ErrorMessage";
import AddFolderForm from "../add-folder-form/AddFolderForm";

export const Folders = () => {
  const modal = useModals();
  const { userId } = useParams();

  const [folders, setFolders] = useState([]);

  const [color, setColor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    foldersServices.getFolder(userId).then((response) => {
      setFolders(response.data);
    })
  }, [userId]);

  const addFolder = (userId, values) => {
    foldersServices.createFolder(userId, values).then((response) => {
      setFolders(folders.concat(response.data));
    }).catch((error) => {
      if (error.response.status === 422) {
        handleMessage('red', `the folder ${values.name} already exists`)
      }
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
    }, 5000);
  };

  const openContentModal = () => {
    modal.openModal({
      title: "Choose your folder's name:",
      centered: true,
      children: <AddFolderForm userId={userId} onSubmit={addFolder} />
    });
  };

  return (
    <div>
      <Navbar />
      <div>
      <ErrorMessage message={errorMessage} style={errorStyle} />
      </div>
      <button onClick={openContentModal}>
        <img src={addFolderImage} alt=''></img>
      </button>
      <div className="wrapper-slider">
        {folders.map((folder) => {
          return (
            <div className="slider" key={folder.id}>
                <img src={folderEmpty} alt='' />
              <p>{folder.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};