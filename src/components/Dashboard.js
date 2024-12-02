import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import '../design/Dashboard.css'; 
import logo from '../design/Teal_logo.png';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="sidebar">
        <h1>Penny-Wise</h1>
        <img src={logo} alt="Logo"  className='logo'/>
        <button onClick={() => navigate('set-budget')}>Set Budget</button>
        <button onClick={() => navigate('budget-status')}>Budget Status</button>
        <button onClick={() => navigate('add-expense')}>Add Expense</button>
        <button onClick={() => navigate('expense-list')}>Expense List</button>
        <button onClick={() => navigate('expense-report')}>Expense Report</button>
        <button onClick={() => navigate('settings')}>Settings</button>
      </div>

      <div className="main-content">
        
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
