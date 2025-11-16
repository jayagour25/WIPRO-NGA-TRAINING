import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./ModalPortal.css"; // optional, for styling

const modalRoot = document.getElementById("modal-root");

const ModalPortal = ({ isOpen, onClose, children }) => {
  // Close modal on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // If modal not open, don’t render anything
  if (!isOpen) return null;

  // Handle clicking on background overlay
  const handleOverlayClick = (e) => {
    if (e.target.className === "modal-overlay") onClose();
  };

  // Create Portal
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default ModalPortal;
