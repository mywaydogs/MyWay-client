import React from "react";
import Button from "../utils/Button";
import Modal from "../utils/Modal";
import TextInput from "../utils/TextInput";
import update from "immutability-helper";

function CustomerModal({ data, title, onChange, onSubmit }) {
  const customer = data.customer;
  const handleInputChange = (e) => {
    onChange(
      update(data, { customer: { [e.target.name]: { $set: e.target.value } } })
    );
  };

  const onRequestClose = () => {
    onChange(update(data, { isOpen: { $set: false } }));
  };

  const onClickBack = () => {
    onChange(update(data, { isOpen: { $set: false } }));
  };

  return (
    <Modal isOpen={data.isOpen} onRequestClose={onRequestClose}>
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>
        <TextInput
          label="שם פרטי"
          name="firstName"
          value={customer.firstName}
          onChange={handleInputChange}
        />
        <TextInput
          label="שם משפחה"
          name="lastName"
          value={customer.lastName}
          onChange={handleInputChange}
        />
        <TextInput
          label="מייל"
          name="email"
          value={customer.email}
          onChange={handleInputChange}
        />
        <TextInput
          label="טלפון"
          name="phone"
          value={customer.phone}
          onChange={handleInputChange}
        />
        <TextInput
          label="כתובת"
          name="address"
          value={customer.address}
          onChange={handleInputChange}
        />
        <div>
          <Button type="submit" value={title} />
          <Button type="button" value="חזור" onClick={onClickBack} />
        </div>
      </form>
    </Modal>
  );
}

export default CustomerModal;
