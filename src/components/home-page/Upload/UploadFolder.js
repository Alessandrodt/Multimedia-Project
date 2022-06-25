import React, { useState, useEffect } from "react";

// libraries
import Select from "react-select";

// services
import foldersServices from "../../../services/foldersServices";

export function UploadFolder({ setSelectedFolder }) {
  const [allFolders, setAllFolders] = useState([]);

  useEffect(() => {
    const userId = JSON.parse(sessionStorage.getItem("user")).id;

    foldersServices
      .getFolder(userId)
      .then((res) => {
        setAllFolders(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const mapOptions = (tags) => {
    if (tags) {
      return tags.map((tag) => ({ value: tag.id, label: tag.name }));
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
        placeholder={"Select a folder for your image... pls thx bye"}
        onChange={(obj) => handleChange(obj.value)}
      />
    </>
  );
}
