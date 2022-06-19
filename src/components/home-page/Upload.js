import React from "react";
import { useState } from "react";

// components
import { Button } from "../utils/Button";
import { UploadPreview } from "./UploadPreview";
import { Tags } from "./Tags";

// services
import imagesServices from "../../services/imagesServices";

export function Upload() {
  const [imagesToUpload, setNewImageUpload] = useState([]);
  // const [tagToUpload, setNewTagToUpload] = useState([]);
  const [uploadedTags, setUploadedTags] = useState([]);

  const delTag = (id, tag) => {
    imagesServices.deleteTag(id).then(() => {
      const tagsWithTagDeleted = tag.filter((t) => t.id !== id);
      setUploadedTags(tagsWithTagDeleted);
    });
  };

  return (
    <div>
      <UploadPreview imagesToUpload={setNewImageUpload} />
      <Tags
        // tagsToUpload={setNewTagToUpload}
        uploadedTags={uploadedTags}
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
        text={"upload"}
      />
    </div>
  );
}

// useparam function from react dom
