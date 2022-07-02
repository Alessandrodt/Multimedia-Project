import React, { useState, useEffect } from "react";

// components
import { SearchByTags } from "./SearchByTag";
import { SearchByDate } from "./SearchByDate";

export function Search() {
  return (
    <>
      <SearchByTags />
      <SearchByDate />
    </>
  );
}
