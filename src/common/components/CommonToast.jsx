import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

function CommonToast({ showToast, closeToast, bg, text }) {
  return (
    <div>
      <ToastContainer
        className="p-3"
        position="top-center"
        style={{ zIndex: 1 }}
      >
        <Toast
          onClose={closeToast}
          show={showToast}
          animation={false}
          bg={bg}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">{text}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default CommonToast;
