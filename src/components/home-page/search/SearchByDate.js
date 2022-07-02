import React, { useState, useEffect } from "react";

// libraries
import DatePicker from "react-datepicker";
// styles
import "react-datepicker/dist/react-datepicker.css";

export function SearchByDate() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      isClearable={true}
    />
  );
}
