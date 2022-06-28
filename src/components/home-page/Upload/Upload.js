import React from "react";
import { useState } from "react";

// components
import { UploadPreview } from "./UploadPreview";
import { UploadTags } from "./UploadTags";
import { UploadFolder } from "./UploadFolder";
import { ErrorMessage } from "../../error-message/ErrorMessage";

// libraries
import { Button, LoadingOverlay } from "@mantine/core";
import { useModals } from "@mantine/modals";

// services
import imagesServices from "../../../services/imagesServices";

export function Upload() {
  const [imagesToUpload, setNewImageUpload] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState([]);
  const setUploadedTags = useState([]);
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const modal = useModals();

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

  /**
   * it handles the modal for the upload, and it uploads the selected image, folder, and tags
   * if the upload is not successful, it handles the errors
   */
  const handleClick = () => {
    setVisible(true);
    imagesServices
      .uploadImage(selectedFolder, imagesToUpload[0], selectedTags)
      .then((res) => {
        if (res && res.status === 201) {
          handleMessage("green", `the upload was successful`);
        } else {
          handleMessage("red", `the upload was unsuccessful, try again`);
          console.log("failed");
        }
        setVisible(false);
      })
      .catch((error) => {
        console.log(error);
        handleMessage(
          "red",
          `there was an issue with the serve, try again later`
        );
        setVisible(false);
      });
  };

  const handleMessage = (color, message) => {
    setColor(color);
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
      modal.closeModal();
    }, 3000);
  };

  const delTag = (id, tag) => {
    imagesServices.deleteTag(id).then(() => {
      const tagsWithTagDeleted = tag.filter((t) => t.id !== id);
      setUploadedTags(tagsWithTagDeleted);
    });
  };

  return (
    <div>
      <LoadingOverlay visible={visible} />
      <ErrorMessage message={errorMessage} style={errorStyle} />
      <UploadPreview imagesToUpload={setNewImageUpload} />
      <UploadTags
        setSelectedTags={setSelectedTags}
        selectedTags={selectedTags}
        delfunc={delTag}
      />
      <UploadFolder setSelectedFolder={setSelectedFolder} />
      <Button
        classNames={"button-upload"}
        onClick={handleClick}
        className={"upload-preview-btn"}
      >
        upload
      </Button>
    </div>
  );
}
