import React from "react";

function CustomerDetails({ customer }) {
  return (
    <>
      <div>
        <label>שם פרטי:</label>
        {customer.firstName}
      </div>
      <div>
        <label>שם משפחה:</label>
        {customer.lastName}
      </div>
      <div>
        <label>מייל:</label>
        {customer.email}
      </div>
      <div>
        <label>טלפון:</label>
        {customer.phone}
      </div>
      <div>
        <label>כתובת:</label>
        {customer.address}
      </div>
    </>
  );
}

export default CustomerDetails;
