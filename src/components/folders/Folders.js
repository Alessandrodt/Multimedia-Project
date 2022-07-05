import { Link } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

// components
import AddFolderForm from "./add-folder-form/AddFolderForm";
import EditFolderForm from "./edit-folder-form/EditFolderForm";
import { Upload } from "../home-page/Upload/Upload";

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
  setNewUploadImages,
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
          modal.closeModal();
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
        modal.closeModal();
      });
  };

  const folderTracker = (name, id) => {
    const routeTo = `/users/${userId}/folders/${id}`;

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
          <p>{item.name}</p>
        </div>
      );
    } else
      return (
        <div key={index}>
          <Anchor
            onClick={() => {
              if (item.name === "Folders") {
                setCrumbs(crumbs.slice(item.name[0], crumbs.indexOf(item) + 1));
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

  const openContentAddModalFolder = () => {
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

  const openContentAddModalUpload = () => {
    modal.openModal({
      centered: true,
      closeOnClickOutside: false,
      children: <Upload setNewUploadImages={setNewUploadImages} />,
      overflow: "outside",
      size: "70%",
    });
  };

  return (
    <main>
      <div className="messageError"></div>
        <div className="folderAddButton">
          <Breadcrumbs className="breadcrumbs">{items}</Breadcrumbs>
          <span className="upload-in-folders" onClick={openContentAddModalUpload}>
            Upload
          </span>
        </div>
        <div className="wrapper-icon-folder">
          <div className="icon-folder">
            <span className="add-icon-folder" onClick={openContentAddModalFolder}>
              <svg width="73" height="63" viewBox="0 0 73 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.4088 63H7.55854C2.80594 63 0 60.2288 0 55.5453V7.47192C0 2.78083 2.79833 0.0209273 7.54714 0.00217796C14.5696 0.00217796 21.592 0.00217796 28.6145 0.00217796C28.9695 -0.0127274 29.3236 0.0490133 29.652 0.183086C29.9803 0.317159 30.275 0.520329 30.5155 0.778401C33.0173 3.29456 35.5723 5.75823 38.0779 8.27814C38.3128 8.52457 38.5997 8.71711 38.9183 8.84217C39.2369 8.96722 39.5795 9.02174 39.9219 9.00187C48.4309 8.97937 56.94 8.97937 65.4491 9.00187C70.2055 9.00187 73 11.7618 73 16.4529C73 29.4849 73 42.517 73 55.549C73 60.2289 70.1979 62.985 65.4453 62.9888L36.4088 63Z" fill="#00D1E0"/>
                <path d="M3 23C3 19.6863 5.68629 17 9 17H62C65.3137 17 68 19.6863 68 23V54C68 57.3137 65.3137 60 62 60H9C5.68629 60 3 57.3137 3 54V23Z" fill="#CEFBFE"/>
                <path d="M67 14H6C2.7 14 0 16.7 0 20V57C0 60.3 2.7 63 6 63H67C70.3 63 73 60.3 73 57V20C73 16.6 70.3 14 67 14ZM16.4 26.3C16.6 25.8 16.9 25.3 17.4 24.8C17.8 24.4 18.3 24 18.9 23.8C19.4 23.6 20 23.4 20.6 23.4C23.2 23.4 25.1 25.3 25 27.9C25 28.5 24.9 29.1 24.7 29.6C24.5 30.1 24.2 30.6 23.7 31C23.3 31.4 22.8 31.7 22.2 31.9C21.7 32.1 21.1 32.2 20.5 32.2C18 32.2 16.1 30.4 16.1 27.9C16.1 27.4 16.2 26.8 16.4 26.3ZM57 53.5C56.1 53.5 55.3 53.5 54.4 53.5H36.5H16.6C14.8 53.5 13.9 52.6 14 51C14 50.6 14.2 50.2 14.5 49.9C17.8 45.5 21 41.1 24.3 36.7C25.3 35.3 26.8 35.3 27.9 36.7C28.8 37.8 29.6 38.9 30.4 40.1C31.1 41 31.1 41 31.7 40.1C34.4 36.1 37.2 32.2 39.8 28.1C41 26.2 43.1 26.6 44.1 28.1C48.9 35.3 53.7 42.5 58.5 49.7C58.9 50.2 59.1 50.7 59.2 51.3C59.2 52.5 58.4 53.4 57 53.5Z" fill="#13ABB7"/>
                <path d="M69.3708 22.4264C70.0218 22.4453 70.5338 22.9879 70.5149 23.6388C70.5068 23.9631 70.3655 24.2535 70.1458 24.4608C69.9261 24.6681 69.6279 24.7912 69.3027 24.7815L63.8161 24.624L63.6553 30.1096C63.6471 30.4364 63.506 30.7265 63.2866 30.9336C63.0672 31.1407 62.7696 31.2645 62.4427 31.2538C61.7917 31.235 61.2797 30.6924 61.2986 30.0414L61.4577 24.5524L55.9699 24.3946C55.3189 24.3758 54.8069 23.8332 54.8258 23.1822C54.8446 22.5312 55.3872 22.0192 56.0382 22.0381L61.5278 22.1991L61.6869 16.7101C61.7058 16.0591 62.2483 15.5471 62.8993 15.566C63.5503 15.5848 64.0623 16.1274 64.0434 16.7784L63.8844 22.2674L69.3708 22.4264Z" fill="#00EDFE"/>
              </svg>
            </span>
            <span className="add-folder">Add Folder</span>
          </div>
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
                  <span
                    className="button-folder-edit"
                    onClick={() => openContentEditModal(folder.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M421.7 220.3L188.5 453.4L154.6 419.5L158.1 416H112C103.2 416 96 408.8 96 400V353.9L92.51 357.4C87.78 362.2 84.31 368 82.42 374.4L59.44 452.6L137.6 429.6C143.1 427.7 149.8 424.2 154.6 419.5L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3zM492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75z" />
                    </svg>
                  </span>
                  <span className="button-folder-delete">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z" />
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
