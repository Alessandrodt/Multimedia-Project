// home

import React, { useState } from "react";

// components
import { NavbarHome } from "./navbar-home-page/NavbarHome";
import { HomeGallery } from "../galleries/HomeGallery";
import { Upload } from "./Upload/Upload";
import { ErrorMessage } from "../error-message/ErrorMessage";

// libraries
import { Button, LoadingOverlay } from "@mantine/core";
import { useModals } from "@mantine/modals";

import { t } from "i18next";

export const HomePage = () => {
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const modals = useModals();

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

  const openContentModal = () => {
    modals.openModal({
      centered: true,
      closeOnClickOutside: false,
      children: (
        <Upload
          setVisible={setVisible}
          setColor={setColor}
          setErrorMessage={setErrorMessage}
        />
      ),
      overflow: "outside",
      size: "70%",
    });
  };

  return (
    <div>
      <NavbarHome />
      <LoadingOverlay visible={visible} />
      <ErrorMessage message={errorMessage} style={errorStyle} />
      <HomeGallery />
      <Button onClick={openContentModal} className="upload-btn">
        {t("upload")}
      </Button>
    </div>
  );
};

// upload

import React from "react";
import { useState } from "react";

// components
import { UploadPreview } from "./UploadPreview";
import { UploadTags } from "./UploadTags";
// import { ErrorMessage } from "../../error-message/ErrorMessage";

// libraries
import { Button } from "@mantine/core";
import { useModals } from "@mantine/modals";

// services
import imagesServices from "../../../services/imagesServices";

export function Upload(setVisible, setColor, setErrorMessage) {
  const [imagesToUpload, setNewImageUpload] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [setUploadedTags] = useState([]);
  // const [visible, setVisible] = useState(false);
  // const [color, setColor] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");

  const modal = useModals();

  // const errorStyle = {
  //   color: color,
  //   background: "lightgrey",
  //   fontSize: "20px",
  //   borderStyle: "solid",
  //   borderRadius: "5px",
  //   padding: "10px",
  //   marginBottom: "10px",
  //   textAlign: "center",
  //   width: "40%",
  //   marginLeft: "28%",
  // };

  const handleClick = () => {
    setVisible(true);
    imagesServices
      .uploadImage("someFolderId", imagesToUpload[0], selectedTags)
      .then((res) => {
        if (res.status === 201) {
          handleMessage("green", `waweeee, the upload was successful`);
        }
        setVisible(false);
        modal.closeModal();
      })
      .catch((error) => {
        if (error.response.status === 422) {
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
      <UploadPreview imagesToUpload={setNewImageUpload} />
      <UploadTags
        setSelectedTags={setSelectedTags}
        selectedTags={selectedTags}
        delfunc={delTag}
      />
      {/* <LoadingOverlay visible={visible} />
      <ErrorMessage message={errorMessage} style={errorStyle} /> */}
      <Button onClick={handleClick} className={"upload-preview-btn"}>
        upload
      </Button>
    </div>
  );
}
