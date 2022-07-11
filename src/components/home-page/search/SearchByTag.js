import React, { useState, useEffect } from "react";

// Libraries
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { t } from "i18next";

// Services;
import imagesServices from "../../../services/imagesServices";

export function SearchByTags({ setSelectedTags }) {
  const [allTags, setAllTags] = useState([]);

  const animatedComponents = makeAnimated();

  /**
   * it loads all the tags and saves them locally and it does tje formatting of the tags from the server formatting to the one required by the component
   */
  useEffect(() => {
    imagesServices.getAllTags().then((result) => {
      setAllTags(result.map((tag) => ({ value: tag.id, label: tag.name })));
    });
  }, []);

  return (
    <Select
      className="search-tags"
      options={allTags}
      onChange={(x) => setSelectedTags(x)}
      closeMenuOnSelect={false}
      components={animatedComponents}
      placeholder={t("tags_search")}
      isMulti
      aria-label="tag"
    />
  );
}
