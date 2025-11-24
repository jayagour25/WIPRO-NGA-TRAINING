import ReactDOM from "react-dom";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div className="bg-white p-4 rounded" onClick={(e) => e.stopPropagation()}>
        {children}

        <button className="btn btn-secondary mt-3" onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
