import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Components
import { NavbarFolders } from "./navbar-folders/NavbarFolders";
import { Folder } from "./Folders";

// Services
import foldersServices from "../../services/foldersServices";
import { Gallery } from "../galleries/Gallery";

export const FoldersList = () => {
  const folderPath = "Folders";

  const { userId, folderId } = useParams();
  const [folders, setFolders] = useState([]);
  const [crumbs, setCrumbs] = useState([
    { name: folderPath, path: `/users/${userId}/folders` },
  ]);
  const [newUploadImages, setNewUploadImages] = useState([]);

  useEffect(() => {
    foldersServices.getFolder(userId, folderId).then((response) => {
      setFolders(folderId ? response.data.folders : response.data);
    });
  }, [userId, folderId]);

  return (
    <>
      <NavbarFolders />
      <article className="wrapper-folder">
        <section className="folders-list">
          <Folder
            crumbs={crumbs}
            setCrumbs={setCrumbs}
            folderId={folderId}
            folders={folders}
            setFolders={setFolders}
            setNewUploadImages={setNewUploadImages}
            userId={userId}
          />
        </section>
        {folderId ? (
          <section className="folder-gallery">
            <Gallery
              folderId={folderId}
              key={folderId}
              newUploadImages={newUploadImages}
            ></Gallery>
          </section>
        ) : (
          <div />
        )}
      </article>
    </>
  );
};
