import React, { useState, useEffect } from "react";

// libraries
import Select from "react-select";

// services
import foldersServices from "../../../services/foldersServices";

export function UploadFolder({ setSelectedFolder }) {
  const [allFolders, setAllFolders] = useState([]);

  /**
   * it gets the user's folders and sets the state locally
   */
  useEffect(() => {
    const userId = JSON.parse(sessionStorage.getItem("user")).id;

    foldersServices
      .getFolderUpload(userId)
      .then((res) => {
        setAllFolders(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const mapOptions = (folder) => {
    if (folder) {
      return folder.map((folder) => ({ value: folder.id, label: folder.name }));
    } else {
      return [];
    }
  };

  const handleChange = (obj) => {
    setSelectedFolder(obj);
  };

  return (
    <>
      <Select
        options={mapOptions(allFolders)}
        placeholder={"Select a folder for your image..."}
        onChange={(obj) => handleChange(obj.value)}
      />
    </>
  );
}
