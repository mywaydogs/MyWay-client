import React from "react";
import TextInput from "./TextInput";

function DateInput({ value, ...props }) {
  const pad2Digits = (num) => `0${num}`.slice(-2);
  const formatDate = (date) => {
    return [
      date.getFullYear(),
      pad2Digits(date.getMonth() + 1),
      pad2Digits(date.getDate()),
    ].join("-");
  };
  return <TextInput type="date" value={formatDate(value)} {...props} />;
}

export default DateInput;
