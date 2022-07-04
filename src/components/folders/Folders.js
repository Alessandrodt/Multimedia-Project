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
    <main>
      <div className="messageError">
        <LoadingOverlay visible={visible} />
      </div>
      <Breadcrumbs>{items}</Breadcrumbs>
      <div className="folderAddButton">
        <span className="folder" onClick={openContentAddModal}>
          <img src={addFolderImage} alt=""></img>
        </span>
      </div>
      <section className="wrapper-slider">
        {folders.map((folder) => {
          return (
            <Card className="card" key={folder.id}>
              <Link to={`/users/${user.id}/folders/${folder.id}`}>
                <span className="slider" onClick={() => folderTracker(folder.name, folder.id)}>
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
                <span className="" onClick={() => openContentEditModal(folder.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M421.7 220.3L188.5 453.4L154.6 419.5L158.1 416H112C103.2 416 96 408.8 96 400V353.9L92.51 357.4C87.78 362.2 84.31 368 82.42 374.4L59.44 452.6L137.6 429.6C143.1 427.7 149.8 424.2 154.6 419.5L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3zM492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75z"/>
                  </svg>
                  Edit
                </span>
                <span className="">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M421.7 220.3L188.5 453.4L154.6 419.5L158.1 416H112C103.2 416 96 408.8 96 400V353.9L92.51 357.4C87.78 362.2 84.31 368 82.42 374.4L59.44 452.6L137.6 429.6C143.1 427.7 149.8 424.2 154.6 419.5L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3zM492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75z"/>
                  </svg>
                  Delete
                </span>
              </div>
            </Card>
          );
        })}
      </section>
    </main>
  );
};
