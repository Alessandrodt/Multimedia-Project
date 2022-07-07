import React, { useState, useEffect } from "react";

// libraries
import Select from "react-select";

// services
import foldersServices from "../../../services/foldersServices";

// Translation
import { t } from "i18next";

export function UploadFolder({ setSelectedFolder }) {
  const [allFolders, setAllFolders] = useState([]);
  const [createDefault, setCreateDefault] = useState(false);
  /**
   * it gets the user's folders and sets the state locally
   */
  useEffect(() => {
    const userId = JSON.parse(sessionStorage.getItem("user")).id;

    foldersServices
      .getFolderUpload(userId)
      .then((res) => {
        if (createDefault && res.data.length === 0) {
          foldersServices
            .createFolder(userId, undefined, { name: "Default" })
            .then((response) => {
              setCreateDefault(true);
              setAllFolders([response.data]);
            });
        } else {
          setCreateDefault(true);
          setAllFolders(res.data);
        }
      })
      .catch((error) => console.log(error));
  }, [createDefault]);

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
        className="folder-select"
        options={mapOptions(allFolders)}
        placeholder={t("folder_select")}
        onChange={(obj) => handleChange(obj.value)}
      />
    </>
  );
}
