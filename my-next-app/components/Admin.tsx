// components/Admin.tsx
import React from 'react';
import { Session } from 'next-auth';

interface AdminProps {
  session: Session;
}

const Admin: React.FC<AdminProps> = ({ session }) => {
  // Optional: Check if the user is authenticated and has an admin role
  if (!session || session.user.role !== 'admin') {
    return <div>Access denied. You do not have permission to view this page.</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome back, {session.user.email}!</p>
      <p>Your role: {session.user.role}</p>

      {/* Example of rendering admin-specific content */}
      <div>
        <h2>Manage Posts</h2>
        {/* Add logic to list, edit, delete posts */}
      </div>

      <div>
        <h2>User Management</h2>
        {/* Add logic to list, approve, ban users */}
      </div>

      {/* Add more sections as needed */}
    </div>
  );
};

export default Admin;
