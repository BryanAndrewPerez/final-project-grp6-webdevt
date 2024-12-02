import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../design/Settings.css';

const Settings = () => {
  const [currentUser, setCurrentUser] = useState(null); // Holds current user data
  const [updatedAccount, setUpdatedAccount] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  // Fetch the current user data from localStorage when the component loads
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const activeUser = JSON.parse(localStorage.getItem('activeUser')); // Active user from localStorage

    if (activeUser) {
      const user = storedUsers.find((u) => u.username === activeUser.username);
      if (user) {
        setCurrentUser(user);
        setUpdatedAccount(user);
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handle updating the account
  const handleUpdateAccount = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = storedUsers.map((user) =>
      user.username === currentUser.username ? updatedAccount : user
    );

    // Update the users in localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('activeUser', JSON.stringify(updatedAccount)); // Update activeUser in localStorage
    alert('Account updated successfully');
    setCurrentUser(updatedAccount); // Update state
  };

  // Handle deleting the account
  const handleDeleteAccount = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = storedUsers.filter((user) => user.username !== currentUser.username);

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.removeItem('activeUser'); // Log out the deleted user
    alert('Account deleted successfully');
    navigate('/?view=signup'); // Redirect to signup or home
  };

  // Handle logging out
  const handleLogout = () => {
    localStorage.removeItem('activeUser'); // Remove session data
    alert('Logged out successfully');
    navigate('/'); // Navigate to home page
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAccount({ ...updatedAccount, [name]: value });
  };

  return (
    <div className="settings-container">
      <h2>Account Settings</h2>
      {currentUser ? (
        <form onSubmit={handleUpdateAccount}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={updatedAccount.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={updatedAccount.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={updatedAccount.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Update Account</button>
        </form>
      ) : (
        <p>Loading account information...</p>
      )}
      <button onClick={handleDeleteAccount}>Delete Account</button>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Settings;
