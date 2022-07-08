import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";

// components
import { UploadPreview } from "./UploadPreview";
import { UploadTags } from "./UploadTags";
import { UploadFolder } from "./UploadFolder";

// libraries
import { Button, LoadingOverlay } from "@mantine/core";
import { useModals } from "@mantine/modals";

// services
import imagesServices from "../../../services/imagesServices";

// Translation
import { t } from "i18next";

export function Upload({ setNewUploadImages }) {
  const [imagesToUpload, setNewImageUpload] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState([]);
  const setUploadedTags = useState([]);
  const [visible, setVisible] = useState(false);

  const modal = useModals();

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
          toast.success(`${t("upload_successful")}`);
          setNewUploadImages(res);
        } else {
          toast.error(`${t("upload_unsuccessful")}`);
          console.log("failed");
        }
        setVisible(false);
        modal.closeModal();
      })
      .catch((error) => {
        console.log(error);
        toast.error(`${t("error_500")}`);
        setVisible(false);
      });
  };

  const delTag = (id, tag) => {
    imagesServices.deleteTag(id).then(() => {
      const tagsWithTagDeleted = tag.filter((t) => t.id !== id);
      setUploadedTags(tagsWithTagDeleted);
    });
  };

  return (
    <div className="upload-img">
      <LoadingOverlay visible={visible} />
      <UploadPreview imagesToUpload={setNewImageUpload} />
      <UploadTags
        setSelectedTags={setSelectedTags}
        selectedTags={selectedTags}
        delfunc={delTag}
      />
      <UploadFolder setSelectedFolder={setSelectedFolder} />
      <div className="button-box-upload">
        <Button
          onClick={handleClick}
          className={"upload-preview-btn"}
          name="upload-img"
          disabled={selectedTags.length === 0 || selectedFolder.length === 0}
        >
          Upload
        </Button>
        <span className="hover">
          {t("upload_hover_info")}
        </span>
      </div>
    </div>
  );
}
