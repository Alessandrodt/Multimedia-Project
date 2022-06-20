import React from "react";
import { useState } from "react";

// components
import { UploadPreview } from "./UploadPreview";
import { UploadTags } from "./UploadTags";

// libraries
import { Button } from "@mantine/core";

// services
import imagesServices from "../../../services/imagesServices";

export function Upload() {
  const [imagesToUpload, setNewImageUpload] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [setUploadedTags] = useState([]);

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
      <Button
        onClick={() =>
          imagesServices.uploadImage(
            "someFolderId",
            imagesToUpload[0],
            "someTag"
          )
        }
      >
        upload
      </Button>
    </div>
  );
}

// to console log  <Button onClick={() => console.log(selectedTags)}>tags</Button>
