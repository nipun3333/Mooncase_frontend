import React from "react";
import Modal from "react-modal";
import "./modal.css";

const customStyles = {
  content: {
    transform: "translate(-50%, -50%)",
    maxHeight: "100vh",
    width: "504px",
    overflow: "auto",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

function ModalLayout(props) {
  return (
    <>
      <div className="">
        <Modal
          isOpen={props.modalstate}
          style={customStyles}
          className="modal bg-white"
          onRequestClose={() => {
            props.setModalstate(false);
          }}
        >
          {props.children}
        </Modal>
      </div>
    </>
  );
}

export default ModalLayout;
