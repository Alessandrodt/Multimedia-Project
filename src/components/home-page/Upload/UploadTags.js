import React, { useState, useEffect } from "react";

// Libraries
import CreatableSelect from "react-select/creatable";
import { t } from "i18next";

// Services
import imagesServices from "../../../services/imagesServices";

export function UploadTags({ setSelectedTags, selectedTags }) {
  const [allTags, setAllTags] = useState([]);

  /**
   * it loads all the tags and saves them locally
   */
  useEffect(() => {
    imagesServices.getAllTags().then((result) => {
      setAllTags(result);
    });
  }, []);

  /**
   *
   * @param {string} newTag
   * @param {actionMeta} actionMeta - the type of action that has been performed in the select box (select, create, remove)
   * if the action was "create" it uploads a tag, adding the last tag in the provided array,
   * then it sets again the array with all the tags and it sets the selection of tags
   *
   * if the action was "select" or "remove", it sets again the selection of tags
   */
  const handleChange = (newTag, actionMeta) => {
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

    if (actionMeta.action === "select-option" || "remove-value") {
      setSelectedTags(newTag);
    }
  };

  /**
   *
   * @param {array} tags
   * @returns a converted formatting of the tags from the server formatting to the one required by the component
   */
  const mapOptions = (tags) => {
    if (tags) {
      return tags.map((tag) => ({ value: tag.id, label: tag.name }));
    } else {
      return [];
    }
  };

  return (
    <>
      <CreatableSelect
        isMulti
        onChange={handleChange}
        options={mapOptions(allTags)}
        placeholder={t("upload_tags")}
      />
    </>
  );
}
