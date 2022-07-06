import React, { useState } from "react";

// libraries
import DatePicker from "react-datepicker";

// styles
import "react-datepicker/dist/react-datepicker.css";

// Translation
import { t } from "i18next";

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
        <span className="border-bottom"></span>
      </span>
    </>
  );
}
