import React from "react";
import "../styles/Modal.css";

function Modal({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h3>هل أنت متأكد من رغبتك من حذف القاعة؟</h3>
        </div>
        <div className="foot">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            إلغاء
          </button>
          <button>نعم</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;