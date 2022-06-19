import React, { useState } from "react";
import { Button } from "../utils/Button";
import imagesServices from "../../services/imagesServices";

export function Tags({ tagToUpload, uploadedTags, delfunc }) {
  const [tagNotUploaded, setTagToUpload] = useState([]);
  const [allTags, setAllTags] = useState([]);

  return (
    <div>
      <input
        className="form-input"
        type="text"
        name="tags"
        placeholder="type your awesome tags here"
        value={tagNotUploaded}
        onChange={(e) => setTagToUpload(e.target.value)}
      ></input>
      <Button
        onClick={() =>
          imagesServices.uploadTag(tagNotUploaded).then((result) => {
            console.log(result);
            setAllTags(allTags.concat([result]));
          })
        }
        text={"create tag"}
      />

      {allTags.length !== 0 && (
        <ul>
          {allTags.map((tag) => (
            <li key={tag.name} style={{ listStyle: "numbers" }}>
              {tag.name}
              <Button
                text="delete"
                onClick={() => {
                  delfunc(tag.id, uploadedTags);
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
