import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import '../design/Settings.css'

const Settings = () => {
  const [account, setAccount] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handle updating the account
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

  // Handle deleting the account
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

  // Handle logging out
  const handleLogout = () => {
    // Clear authentication data (e.g., remove token or user info from localStorage)
    localStorage.removeItem('user'); // Adjust based on how you store the user's data
    
    // Redirect to the home page
    navigate('/'); // This navigates to the home page
  };

  return (
    <div className=' settings-container'>
      <h2>Account Settings</h2>
      <form onSubmit={handleUpdateAccount}>
        <input
          type="text"
          placeholder="Username"
          value={account.username}
          onChange={(e) => setAccount({ ...account, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={account.email}
          onChange={(e) => setAccount({ ...account, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={account.password}
          onChange={(e) => setAccount({ ...account, password: e.target.value })}
        />
        
      </form>
      <button type="submit" >Update Account</button>
      <button onClick={handleDeleteAccount}>Delete Account</button>
      
      {/* Log Out Button */}
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Settings;
