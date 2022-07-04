import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// components
import AddFolderForm from "./add-folder-form/AddFolderForm";
import EditFolderForm from "./edit-folder-form/EditFolderForm";

// services
import foldersServices from "../../services/foldersServices";

// libraries
import { Anchor, Breadcrumbs, Card, LoadingOverlay } from "@mantine/core";
import { useModals } from "@mantine/modals";

// style
import addFolderImage from "../../images/addFolder.svg";
import folderEmpty from "../../images/folder_icon_empty.svg";
import folderWithElement from "../../images/folder_icon.svg";

export const Folder = ({
  userId,
  folderId,
  folders,
  setFolders,
  crumbs,
  setCrumbs,
}) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const modal = useModals();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    foldersServices.getFolder(userId, folderId).then((response) => {
      setFolders(folderId ? response.data.folders : response.data);
    });
  }, [userId, folderId, setFolders]);

  const addFolder = (userId, values) => {
    setVisible(true);
    foldersServices
      .createFolder(userId, folderId, values)
      .then((response) => {
        setFolders(folders.concat(response.data));
        toast.success(`${values.name} was created successfully`);
        setVisible(false);
      })
      .catch((error) => {
        if (error.response.status === 422) {
          toast.error(`the folder ${values.name} already exists`);
        }
        setVisible(false);
      });
  };

  const editFolderName = (userId, folderId, values) => {
    foldersServices
      .editFolder(userId, folderId, values)
      .then((response) => {
        setFolders(
          folders.map((folder) =>
            folder.id === folderId ? response.data : folder
          )
        );
        toast.success(`the folder has been modified successfully`);
      })
      .catch((error) => {
        if (error.message.status === 403) {
          toast.error(`you don't have the rights to modify this folder`);
        } else if (error.response.status === 422) {
          toast.error(`the folder ${values.name} already exists`);
        }
      });
  };

  const folderTracker = (name, id) => {
    const routeTo = 
      `/users/${userId}/folders/${id}`;
     
    const folderPath = {
      name,
      path: routeTo,
    };

    setCrumbs(crumbs.concat(folderPath));
  };

  const items = crumbs.map((item, index) => {
    return (
      <div key={index}>
        <Anchor
          onClick={() => {
            if(item.name === 'Folders') {
              setCrumbs(crumbs.slice(item.name[0], crumbs.indexOf(item) + 1))
            } else {
              setCrumbs(crumbs.slice(item.name, crumbs.indexOf(item)));
            }
          }}
          component={Link}
          to={item.path}
        >
          {item.name}
        </Anchor>
      </div>
    );
  });

  const openContentAddModal = () => {
    modal.openModal({
      title: "Choose your folder's name:",
      children: <AddFolderForm userId={userId} onSubmit={addFolder} />,
    });
  };

  const openContentEditModal = (id) => {
    modal.openModal({
      title: "Choose your new folder's name:",
      children: (
        <EditFolderForm
          userId={userId}
          folderId={id}
          onSubmit={editFolderName}
        />
      ),
    });
  };

  return (
    <section className="wrapper-folder">
      <div className="messageError">
        <LoadingOverlay visible={visible} />
      </div>
      <Breadcrumbs>{items}</Breadcrumbs>
      <div className="folderAddButton">
        <span className="folder" onClick={openContentAddModal}>
          <img src={addFolderImage} alt=""></img>
          <p>Add Folder</p>
        </span>
      </div>
      <section className="wrapper-slider">
        {folders.map((folder) => {
          return (
            <Card className="card" key={folder.id}>
              <Link to={`/users/${user.id}/folders/${folder.id}`}>
                <span
                  className="slider"
                  onClick={() => folderTracker(folder.name, folder.id)}
                >
                  <img
                    src={
                      folder.folders_count === 0
                        ? folderEmpty
                        : folderWithElement
                    }
                    alt=""
                  />
                  <p>{folder.name}</p>
                </span>
              </Link>
              {/* button Edit / Delete */}
              <div className="wrapper-button">
                <div
                  className="button-folder-edit"
                  onClick={() => openContentEditModal(folder.id)}
                >
                  <span>Edit</span>
                </div>
                <div className="button-folder-delete">
                  <span>Delete</span>
                </div>
              </div>
            </Card>
          );
        })}
      </section>
    </section>
  );
};
