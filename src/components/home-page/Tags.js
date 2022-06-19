import React, { useState, useEffect } from "react";
import imagesServices from "../../services/imagesServices";
import CreatableSelect from "react-select/creatable";

export function Tags({ setSelectedTags, selectedTags }) {
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    imagesServices.getAllTags().then((result) => {
      setAllTags(result);
    });
  }, []);

  const handleChange = (newTag, actionMeta) => {
    console.log(actionMeta.action);
    if (actionMeta.action === "create-option") {
      imagesServices
        .uploadTag(newTag[newTag.length - 1].label)
        .then((result) => {
          setAllTags(allTags.concat(result));
          setSelectedTags(
            selectedTags.concat({ value: result.id, label: result.name })
          );
        })
        .catch((error) => console.log(error));
    }

    if (actionMeta.action === "select-option") {
      setSelectedTags(selectedTags.concat(newTag[newTag.length - 1]));
    }
  };

  return (
    <div>
      <CreatableSelect
        isMulti
        onChange={handleChange}
        options={allTags.map((tag) => ({ value: tag.id, label: tag.name }))}
      />
    </div>
  );
}
