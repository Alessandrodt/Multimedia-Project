import React, { useState, useEffect } from "react";

// Components
import { SearchByTags } from "./SearchByTag";
import { SearchByDate } from "./SearchByDate";

export function Search({ setSearchParams }) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);

  useEffect(() => {
    setSearchParams({ tags: selectedTags, date: selectedDate });
  }, [selectedTags, selectedDate, setSearchParams]);

  return (
    <>
      <div className="wrapper-search">
        <SearchByTags setSelectedTags={setSelectedTags} />
        <SearchByDate setSelectedDate={setSelectedDate} />
      </div>
    </>
  );
}
