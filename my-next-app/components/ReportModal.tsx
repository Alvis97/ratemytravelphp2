import React, { useState } from "react";
import modalStyle from "../styles/components/modal.module.scss";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [reason, setReason] = useState("");

  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reason.trim()) {
      onSubmit(reason);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={modalStyle.modalOverlay}>
      <div className={modalStyle.modalContent}>
        <button className={modalStyle.closeButton} onClick={onClose}>×</button>
        <h2 className={modalStyle.h2}>Report Post</h2>
        <p>Does this post state anything problematic? Please report to our moderators and they will take further actions.</p>
        <form onSubmit={handleSubmit}>
          <textarea
            className={modalStyle.textarea}
            value={reason}
            onChange={handleReasonChange}
            placeholder="What is the reason for this report?"
            required
          />
          <button type="submit" className={modalStyle.submitButton}>Report</button>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
