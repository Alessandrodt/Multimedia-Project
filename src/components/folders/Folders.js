import { useParams } from "react-router-dom";
import { useState } from "react";

import { Box, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useModals } from '@mantine/modals';


import { Navbar } from "./navbar-folders/Navbar-folders"

import foldersServices from "../../services/foldersServices";

import addFolderImage from "../../images/addFolder.svg"

export const Folders = () => {
  const modals = useModals();
  const {userId} = useParams();

  const [folders, setFolders] = useState([]);
  const [folder, setFolder] = useState('');

  const newFolder = {
    name: folder
  };

  const addFolder = () => {
    foldersServices.createFolder(userId, newFolder).then((response) => {
      setFolders(folders.concat(response.data));
    }).catch((error) => {
      console.log(error);
    })
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
        children: (
          <Box>
            <form onSubmit={form.onSubmit(() => addFolder())}>
              <TextInput 
                required
                placeholder="name folder"
                onChange={(event) => {
                  form.setFieldValue("name", event.currentTarget.value);
                  setFolder(event.target.value)}} />
              <Button fullWidth onClick={() => modals.closeModal()} type="submit">
                Create
              </Button>
            </form>
          </Box>  
        ),
      });
    };    

  return (
    <>
      <Navbar/>
      <button onClick={openContentModal}>
          <img src={addFolderImage} alt=''></img>
      </button>
    </>
  );
};