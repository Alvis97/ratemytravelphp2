import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

//Styling
import formStyle from '../styles/pages/account.module.scss';

const UpdatePasswordForm = () => {
  const { data: session, status } = useSession();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === 'loading') {
      setError('Session is loading, please wait.');
      return;
    }

    if (!session) {
      setError('You must be logged in to update your password.');
      return;
    }

    // Prepare data to be sent
    const dataToSend = {
      currentPassword,
      newPassword,
      email: session.user.email, // Pass user email or other relevant session data
    };

    // Log data for debugging
    console.log('Data being sent to API:', dataToSend);

    try {
      const response = await fetch('/api/updatePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setMessage('Password updated successfully');
        setError('');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update password');
        setMessage('');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setError('An unexpected error occurred');
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={formStyle.form}>
      <h2 className={formStyle.h2}>Update password</h2>
      <div>
        <label className={formStyle.label} htmlFor="currentPassword">Current Password:</label>
        <br />
        <input
          className={formStyle.input}
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <br />
      </div>
      <div>
        <label className={formStyle.label} htmlFor="newPassword">New Password:</label>
        <br />
        <input
          className={formStyle.input}
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <br />
      </div>
      <button className={formStyle.CFAButton} type="submit">Update Password</button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default UpdatePasswordForm;
