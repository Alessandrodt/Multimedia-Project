import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// components
import AddFolderForm from "../../components/folders/add-folder-form/AddFolderForm";
import EditFolderForm from "../../components/folders/edit-folder-form/EditFolderForm";
import { ErrorMessage } from "../error-message/ErrorMessage";
import { NavbarFolders } from "./navbar-folders/NavbarFolders";
import { Gallery } from "../galleries/Gallery";

// libraries
import { Anchor, Breadcrumbs, Card, LoadingOverlay } from "@mantine/core";
import { useModals } from "@mantine/modals";

// services
import foldersServices from "../../services/foldersServices";

// style
import addFolderImage from "../../images/addFolder.svg";
import folderEmpty from "../../images/folder_icon_empty.svg";

export const Folders = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const modal = useModals();

  const { userId, folderId } = useParams();

  const [folders, setFolders] = useState([]);
  const [visible, setVisible] = useState(false);

  const [crumbs, setCrumbs] = useState([]);

  const [color, setColor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    foldersServices.getFolder(userId, folderId).then((response) => {
      setFolders(folderId ? response.data.folders : response.data);
    });
  }, [userId, folderId]);

  const addFolder = (userId, values) => {
    setVisible(true);
    foldersServices
      .createFolder(userId, folderId, values)
      .then((response) => {
        setFolders(folders.concat(response.data));
        setVisible(false);
      })
      .catch((error) => {
        if (error.response.status === 422) {
          handleMessage("red", `the folder ${values.name} already exists`);
        }
        setVisible(false);
      });
  };

  const editFolderName = (userId, folderId, values) => {
    foldersServices
      .editFolder(userId, folderId, values)
      .then((response) => {
        setFolders(
          folders.map((f) => (f.folderId === folderId ? response.data : f))
        );
      })
      .catch((error) => {
        if (error.message.status === 403) {
          handleMessage(
            "red",
            `you don't have the rights to modify this folder`
          );
        } else if (error.response.status === 422) {
          handleMessage("red", `the folder ${values.name} already exists`);
        }
      });
  };

  const folderTracker = (name) => {
    const routeTo = folderId
      ? `/users/${userId}/folders/${folderId}`
      : `/users/${userId}/folders/`;

    const folderPath = {
      name,
      path: routeTo,
    };

    setCrumbs(crumbs.concat(folderPath));
  };

  const items = crumbs?.map((item, index) => {
    // let currentPath = folderId === null
    // ? -1
    // : item.name

    return (
      <>
        <Anchor
          onClick={() =>
            setCrumbs(crumbs.slice(item.name, crumbs.indexOf(item.name)))
          }
          component={Link}
          to={item.path}
          key={index}
        >
          {item.name}
        </Anchor>
        <Gallery folderId={folderId}></Gallery>
      </>
    );
  });

  const errorStyle = {
    color: color,
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
    textAlign: "center",
    width: "40%",
    marginLeft: "28%",
  };

  const handleMessage = (color, message) => {
    setColor(color);
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

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
    <div>
      <NavbarFolders />
      <div className="messageError">
        <LoadingOverlay visible={visible} />
        <ErrorMessage message={errorMessage} style={errorStyle} />
      </div>
      <Breadcrumbs>{items}</Breadcrumbs>
      <div className="folderAddButton">
        <span className="folder" onClick={openContentAddModal}>
          <img src={addFolderImage} alt=""></img>
        </span>
      </div>
      <div className="wrapper-slider">
        {folders.map((folder) => {
          return (
            <Card className="card" key={folder.id}>
              <Link to={`/users/${user.id}/folders/${folder.id}`}>
                <span className="slider" onClick={() => folderTracker(folder.name, folder.id)}>
                  <img src={folderEmpty} alt="" />
                  <p>{folder.name}</p>
                </span>
              </Link>
              {/* button Edit / Delete */}
              <div className="wrapper-button">
                <div className="button-folder-edit" onClick={() => openContentEditModal(folder.id)}>
                  <span>Edit</span>
                </div>
                <div className="button-folder-delete">
                  <span>Delete</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
