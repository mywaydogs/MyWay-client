import React from 'react';
import ReactModal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: '40vw',
    maxHeight: '90%',
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

ReactModal.setAppElement("#root");

function Modal(props) {
  return <ReactModal style={customStyles} {...props} />;
}

export default Modal;
