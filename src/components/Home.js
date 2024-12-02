import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../design/Home.css';
import Login from './Login';
import Signup from './Signup';
import logo from '../design/Teal_logo.png';

const Home = () => {
  const [activeView, setActiveView] = useState(''); 
  const location = useLocation();

  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const view = queryParams.get('view');
    if (view === 'login') {
      setActiveView('login');
    }
  }, [location]);

  return (
    <div className="logsigncontainer">
      {/* Left Section */}
      <div className="left-section">
      <img src={logo} alt="Logo"  className='logo'/>
        <h1>Penny-Wise</h1>
        <p>Be wise with your pennies</p>
        <div>
          <button onClick={() => setActiveView('login')}>Login</button>
          <button onClick={() => setActiveView('signup')}>Sign Up</button>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        {activeView === 'login' && <Login />} {/* Render Login component */}
        {activeView === 'signup' && <Signup />} {/* Render Signup component */}
        {!activeView && <p>Select an option to get started!</p>} {/* Default message */}
      </div>
    </div>
  );
};

export default Home;
