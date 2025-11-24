import React, { useState } from "react";
import Modal from "../components/Modal";

export default function NotificationsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="container mt-5">
      <h2>Portal Modal</h2>

      <button className="btn btn-info" onClick={() => setOpen(true)}>
        Show Notification
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h3>New Course Available!</h3>
        <p>Explore our new advanced React course.</p>
      </Modal>
    </div>
  );
}
