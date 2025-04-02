import React, { useState } from "react";
import Modal from "../Common/Modal";

const modalInfo = {
  heading: "Title",
  body: "mayank kya haal hain",
};

const ModalContainer = () => {
  const [modalStatus, setModalStatus] = useState(false);
  const [modalStatus2, setModalStatus2] = useState(false);
  return (
    <div>
      Home
      <button onClick={() => setModalStatus(true)}>OPEN MODAL</button>
      {modalStatus && (
        <Modal
          isOpen={modalStatus}
          setOpen={setModalStatus}
          modalInfo={modalInfo}
        >
          <h4>Parent Modal</h4>
          <h5>body is rendered</h5>
          <button onClick={() => setModalStatus2(true)}>OPEN MODAL 2</button>
          {modalStatus && (
            <Modal
              isOpen={modalStatus2}
              setOpen={setModalStatus2}
              modalInfo={modalInfo}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default ModalContainer;
