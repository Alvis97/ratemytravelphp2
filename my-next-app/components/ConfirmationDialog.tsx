import React from 'react';

interface ConfirmationDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <p>{message}</p>
        <button style={yesBtn} onClick={onConfirm}>Yes</button>
        <button style={noBtn} onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

// Styles for the modal and overlay
const overlayStyle = {
  position: 'fixed' as 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '5px',
  boxShadow: '0 0 10px rgba(0,0,0,0.2)',
  width: '300px',
};

const yesBtn = {
    color: 'white',
    backgroundColor: 'red',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: 'none',
    fontSize: '16px',
    fontFamily: 'Inter',
};

const noBtn = {
    color: 'black',
    backgroundColor: 'green',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: 'none',
    fontSize: '16px',
    fontFamily: 'Inter',
}

export default ConfirmationDialog;
