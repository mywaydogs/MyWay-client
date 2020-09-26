import React from "react";

function PreliminaryDiagnosis({
  data: preliminaryDiagnosis,
  handleInputChange,
  handleSubmit,
}) {
  return (
    <>
      <div>
        <h3>אבחון הכלב</h3>
        <textarea
          name="diagnosis"
          value={preliminaryDiagnosis.diagnosis}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div>
        <h3>בחירת עזרים</h3>
        <textarea
          name="accessories"
          value={preliminaryDiagnosis.accessories}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div>
        <h3>ניהול סביבתי</h3>
        <textarea
          name="environmentalManagement"
          value={preliminaryDiagnosis.environmentalManagement}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div>
        <h3>סיכום</h3>
        <textarea
          name="summary"
          value={preliminaryDiagnosis.summary}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <input type="button" value="שמור" onClick={handleSubmit} />
    </>
  );
}

export default PreliminaryDiagnosis;
