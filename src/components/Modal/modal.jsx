import React from 'react';
import './modal.css';

const Modal = ({ handleClose, show, children }) => {
  // Prevent clicks inside modal from closing it
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName} onClick={handleClose}>
      <section className="modal-main" onClick={handleModalClick}>
        {children}
      </section>
    </div>
  );
};

export default Modal;