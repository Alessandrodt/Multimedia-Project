import { Link } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

// components
import AddFolderForm from "./add-folder-form/AddFolderForm";
import EditFolderForm from "./edit-folder-form/EditFolderForm";

// services
import foldersServices from "../../services/foldersServices";

// libraries
import { Anchor, Breadcrumbs, Card } from "@mantine/core";
import { useModals } from "@mantine/modals";

// style
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

  useEffect(() => {
    foldersServices.getFolder(userId, folderId).then((response) => {
      setFolders(folderId ? response.data.folders : response.data);
    });
  }, [userId, folderId, setFolders]);

  const addFolder = (userId, values) => {
    foldersServices
      .createFolder(userId, folderId, values)
      .then((response) => {
        setFolders(folders.concat(response.data));
        toast.success(`${values.name} was created successfully`);
        modal.closeModal();
      })
      .catch((error) => {
        if (error.response.status === 422) {
          toast.error(`the folder ${values.name} already exists`);
        }
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
        modal.closeModal();
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
    if (crumbs.indexOf(item) === crumbs.length - 1) {
      return (
        <div key={index}>
          <p>
            {item.name}
          </p>
        </div>
      );
    } else 
    return (
      <div key={index}>
        <Anchor
          onClick={() => {
            if(item.name === 'Folders') {
              setCrumbs(crumbs.slice(item.name[0], crumbs.indexOf(item) + 1))
            } else {
              setCrumbs(crumbs.slice(item, crumbs.indexOf(item) + 1));
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
      </div>
      <div className="folderAddButton">
        <Breadcrumbs className="breadcrumbs">{items}</Breadcrumbs>
        <span className="folder" onClick={openContentAddModal}>
          Add Folder
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
                <span className="button-folder-edit" onClick={() => openContentEditModal(folder.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M421.7 220.3L188.5 453.4L154.6 419.5L158.1 416H112C103.2 416 96 408.8 96 400V353.9L92.51 357.4C87.78 362.2 84.31 368 82.42 374.4L59.44 452.6L137.6 429.6C143.1 427.7 149.8 424.2 154.6 419.5L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3zM492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75z"/>
                  </svg>
                </span>
                <span className="button-folder-delete">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/>
                </svg>
                </span>
              </div>
            </Card>
          );
        })}
      </section>
    </main>
  );
};
