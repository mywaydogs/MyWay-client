import React from "react";
import Button from "../utils/Button";
import update from "immutability-helper";

function PreliminaryDiagnosis({ data, onChange, onSubmit }) {
  const handleOnChange = (e) => {
    onChange(update(data, { [e.target.name]: { $set: e.target.value } }));
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <h3>אבחון הכלב</h3>
        <textarea
          name="diagnosis"
          value={data.diagnosis}
          onChange={handleOnChange}
        ></textarea>
      </div>
      <div>
        <h3>בחירת עזרים</h3>
        <textarea
          name="accessories"
          value={data.accessories}
          onChange={handleOnChange}
        ></textarea>
      </div>
      <div>
        <h3>ניהול סביבתי</h3>
        <textarea
          name="environmentalManagement"
          value={data.environmentalManagement}
          onChange={handleOnChange}
        ></textarea>
      </div>
      <div>
        <h3>סיכום</h3>
        <textarea
          name="summary"
          value={data.summary}
          onChange={handleOnChange}
        ></textarea>
      </div>
      <Button type="submit" value="שמירה" />
    </form>
  );
}

export default PreliminaryDiagnosis;
