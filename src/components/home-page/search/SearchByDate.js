import React, { useState } from "react";

// Libraries
import DatePicker from "react-datepicker";
import { t } from "i18next";

// Styles
import "react-datepicker/dist/react-datepicker.css";

export function SearchByDate({ setSelectedDate }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <>
      <span className="calendar">
        <DatePicker
          className="data-picker"
          placeholderText={t("search_date_picker_placeholder")}
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
          onChange={(update) => {
            setDateRange(update);
            setSelectedDate(update);
          }}
          isClearable={true}
        />
      </span>
    </>
  );
}
