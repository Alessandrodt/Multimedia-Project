import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// components
import { NavbarFolders } from "./navbar-folders/NavbarFolders";
import { Folder } from "./Folders";

// services
import foldersServices from "../../services/foldersServices";
import { Gallery } from "../galleries/Gallery";

export const FoldersList = () => {
  const { userId, folderId } = useParams();
  const [folders, setFolders] = useState([]);
  const [crumbs, setCrumbs] = useState([]);

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
            userId={userId}
          />
        </section>
        {folderId ? (
          // add style in scss to gallery
          <section className="folder-gallery">
            <Gallery
              folderId={folderId}
              key={folderId}
            ></Gallery>
          </section>
        ) : (
          <div />
        )}
      </article>
    </>
  );
};
