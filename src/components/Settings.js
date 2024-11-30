import React, { useState } from 'react';

const Settings = () => {
  const [account, setAccount] = useState({ username: '', email: '', password: '' });

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/account', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(account),
      });

      if (response.ok) {
        console.log('Account updated successfully');
      } else {
        console.error('Failed to update account');
      }
    } catch (error) {
      console.error('Failed to update account', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/account', {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Account deleted successfully');
      } else {
        console.error('Failed to delete account');
      }
    } catch (error) {
      console.error('Failed to delete account', error);
    }
  };

  return (
    <div>
      <h2>Account Settings</h2>
      <form onSubmit={handleUpdateAccount}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setAccount({ ...account, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setAccount({ ...account, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setAccount({ ...account, password: e.target.value })}
        />
        <button type="submit">Update Account</button>
      </form>
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
};

export default Settings;
