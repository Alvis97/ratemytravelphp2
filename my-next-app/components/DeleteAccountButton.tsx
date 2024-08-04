import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import ConfirmationDialog from './ConfirmationDialog'; // Import the dialog component

import DeleteAccountStyle from '../styles/pages/account.module.scss';

const DeleteAccountButton = () => {
  const { data: session, status } = useSession();
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (status === 'loading') {
      setError('Session is loading, please wait.');
      return;
    }

    if (!session) {
      setError('You must be logged in to delete your account.');
      return;
    }

    try {
      const response = await fetch('/api/deleteAccount', {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Account deleted successfully');
        setError('');
        // Optionally: Sign out the user
        await signOut({ redirect: true, callbackUrl: '/' });
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete account');
        setMessage('');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      setError('An unexpected error occurred');
      setMessage('');
    }
  };

  const handleConfirmDelete = () => {
    setShowDialog(true);
  };

  const handleDialogConfirm = () => {
    setShowDialog(false);
    handleDelete();
  };

  const handleDialogCancel = () => {
    setShowDialog(false);
  };

  return (
    <div className={DeleteAccountStyle.deleteDiv}>
      <p>Don't want to stick around? Deleted acounts will lose all data</p>
      <button 
      className={DeleteAccountStyle.DeleteButton} 
      onClick={handleConfirmDelete}>
        Delete Account
      </button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {showDialog && (
        <ConfirmationDialog
          message="If you delete your account, all information will be lost. Are you sure you want to delete your account?"
          onConfirm={handleDialogConfirm}
          onCancel={handleDialogCancel}
        />
      )}
    </div>
  );
};

export default DeleteAccountButton;

