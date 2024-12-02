import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, CartesianGrid as LineCartesianGrid } from 'recharts';
import '../design/ExpenseReport.css';

const defaultExpenses = []; 

const ExpenseReport = ({ userRole }) => {
  const [expenses, setExpenses] = useState([]);
  const [remainingBudget, setRemainingBudget] = useState(0); 
  const [totalBudget, setTotalBudget] = useState(0); 

  
  const fetchExpenses = () => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(savedExpenses);
  };

  
  const fetchBudgetStatus = () => {
    const savedBudget = JSON.parse(localStorage.getItem('budget')) || { totalBudget: 0, amountSpent: 0 };
    setTotalBudget(savedBudget.totalBudget);
    setRemainingBudget(savedBudget.totalBudget - savedBudget.amountSpent);
  };

  
  const handleClearExpenses = () => {
    localStorage.setItem('expenses', JSON.stringify(defaultExpenses));
    setExpenses(defaultExpenses);
    window.dispatchEvent(new Event('expensesCleared')); 
  };

  useEffect(() => {
    
    fetchExpenses();
    fetchBudgetStatus();

    
    const handleExpensesCleared = () => fetchExpenses();
    window.addEventListener('expensesCleared', handleExpensesCleared);

    return () => {
      window.removeEventListener('expensesCleared', handleExpensesCleared);
    };
  }, []);

  
  const totalExpenses = expenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0); 
  const formattedTotalExpenses = isNaN(totalExpenses) ? 0 : totalExpenses;

  
  const chartData = expenses.map((expense) => ({
    category: expense.category,
    amount: expense.amount,
  }));

  
  const spendingTrends = expenses.reduce((acc, expense) => {
    const date = expense.date; 
    if (!acc[date]) {
      acc[date] = { date, amount: 0 };
    }
    acc[date].amount += parseFloat(expense.amount || 0); 
    return acc;
  }, {});

  
  const trendData = Object.values(spendingTrends);

  return (
    <div className="expense-container" style={{ width: '100%', padding: '20px' }}>
      <h3>Expense Report</h3>

      {/* Total Expenses Overview */}
      <div>
        <h4>Total Expenses: ${formattedTotalExpenses}</h4>
        <h4>Remaining Budget: ${remainingBudget}</h4>
      </div>

      {/* Admin Button for Clearing Expenses */}
      {userRole === 'admin' && (
        <div>
          <button onClick={handleClearExpenses} style={{ marginTop: '20px', padding: '10px', backgroundColor: 'red', color: 'white' }}>
            Clear Expenses (Admin Only)
          </button>
        </div>
      )}

      {/* Graphs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '100px' }}>
        {/* Expense by Category */}
        <div style={{ width: '48%', height: 300 }}>
          <h4>Expense by Category</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Spending Trends */}
        <div style={{ width: '48%', height: 300 }}>
          <h4>Spending Trends Over Time</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
              <LineCartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts */}
      {remainingBudget < 100 && (
        <div style={{ color: 'red', fontWeight: 'bold' }} className='warning'>
          <h5>Warning: Your remaining budget is running low!</h5>
        </div>
      )}
    </div>
  );
};

export default ExpenseReport;
