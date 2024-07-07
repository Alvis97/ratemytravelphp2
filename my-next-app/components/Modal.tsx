// components/Modal.tsx
import React from "react";
import modalStyles from "../styles/components/modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className={modalStyles.overlay} onClick={onClose}>
      <div className={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
