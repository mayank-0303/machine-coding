import React from "react";
import "./Modal.css";
import { createPortal } from "react-dom";
/*
  As we render modal on the same portal as alll of the modals are in same hirarch
  so even if the z-index is same still the last one will be rendered on top 
*/
const Modal = ({ isOpen = false, setOpen, modalInfo, children }) => {
  return (
    isOpen &&
    createPortal(
      <div className="modal-container">
        <div className="modal">
          <h1>{modalInfo.heading}</h1>
          {children ? children : <h5>{modalInfo.body}</h5>}
          <button onClick={() => setOpen(false)}>xxxx</button>
        </div>
      </div>,
      document.getElementById("modal-portal")
    )
  );
};

export default Modal;
