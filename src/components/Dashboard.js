import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';


const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <button onClick={() => navigate('set-budget')}>Set Budget</button>
        <button onClick={() => navigate('budget-status')}>Budget Status</button>
        <button onClick={() => navigate('add-expense')}>Add Expense</button>
        <button onClick={() => navigate('expense-list')}>Expense List</button>
        <button onClick={() => navigate('expense-report')}>Expense Report</button>
        
      </div>

      
      <Outlet />
    </div>
  );
};

export default Dashboard;
