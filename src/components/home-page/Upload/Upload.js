import React from "react";
import { useState } from "react";

// components
import { UploadPreview } from "./UploadPreview";
import { UploadTags } from "./UploadTags";
import { ErrorMessage } from "../../error-message/ErrorMessage";

// libraries
import { Button, LoadingOverlay } from "@mantine/core";
import { useModals } from "@mantine/modals";

// services
import imagesServices from "../../../services/imagesServices";

export function Upload() {
  const [imagesToUpload, setNewImageUpload] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [setUploadedTags] = useState([]);
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

  const handleClick = () => {
    setVisible(true);
    imagesServices
      .uploadImage("someFolderId", imagesToUpload[0], selectedTags)
      .then((res) => {
        if (res.status === 201) {
          handleMessage("green", `the upload was successful`);
          console.log("aiuto");
        }
        setVisible(false);
      })
      .catch((error) => {
        if (error.res.status >= 400) {
          handleMessage("red", `the upload was unsuccessful`);
        }
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
      <Button onClick={handleClick} className={"upload-preview-btn"}>
        upload
      </Button>
    </div>
  );
}
