import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Box, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useModals } from '@mantine/modals';


import { Navbar } from "./navbar-folders/Navbar-folders"

import foldersServices from "../../services/foldersServices";

import folderEmpty from "../../images/folder_icon_empty.png"
import addFolderImage from "../../images/addFolder.svg"

import { ErrorMessage } from "../error-message/ErrorMessage";

export const Folders = () => {
  const modals = useModals();
  const {userId} = useParams();

  const [folders, setFolders] = useState([]);

  const [color, setColor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
      foldersServices.getFolder(userId).then((response) => {
        setFolders(response.data);
      })
  },[userId]);

  const errorStyle = {
    color: color,
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  const handleMessage = (color, message) => {
    setColor(color);
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const addFolder = (values) => {
    foldersServices.createFolder(userId, values).then((response) => {
      setFolders(folders.concat(response.data));
    }).catch((error) => {
      if (error.response.status === 422) {
        handleMessage(`'red', a folder ${values.name} already exists `)
      }
    });
  };

  const form = useForm({
      initialValues: {
        name: '',
      },
  
      validate: {
      name: (value) =>  value.length < 2 ? "the name has to be at least 2 characters long" : null,
      },
  });

  const openContentModal = () => {
      modals.openModal({
        title: "Choose your folder's name:",
        centered: true,
        children: (
          <Box>
            <form onSubmit={form.onSubmit((values) => addFolder(values))}>
              <TextInput 
                required
                data-autofocus
                placeholder="name folder"
                onChange={(event) => {
                  form.setFieldValue("name", event.currentTarget.value);
                  }} />
              <Button fullWidth onClick={() => modals.closeModal()}  type="submit">
                Create
              </Button>
            </form>
          </Box>  
        ),
      });
    };    
    
  return (
    <div>
      <Navbar/>
      <ErrorMessage message={errorMessage} style={errorStyle} />
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