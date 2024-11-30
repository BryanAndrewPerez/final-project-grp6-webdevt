import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, CartesianGrid as LineCartesianGrid } from 'recharts';

// Example default expenses
const defaultExpenses = []; // Default empty expenses after clearing

const ExpenseReport = ({ userRole }) => {
  const [expenses, setExpenses] = useState([]);
  const [remainingBudget, setRemainingBudget] = useState(0); // Updated dynamically
  const [totalBudget, setTotalBudget] = useState(0); // Updated dynamically

  // Fetch expenses from localStorage or default
  const fetchExpenses = () => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(savedExpenses);
  };

  // Fetch budget status
  const fetchBudgetStatus = () => {
    const savedBudget = JSON.parse(localStorage.getItem('budget')) || { totalBudget: 0, amountSpent: 0 };
    setTotalBudget(savedBudget.totalBudget);
    setRemainingBudget(savedBudget.totalBudget - savedBudget.amountSpent);
  };

  // Handle clearing of expenses (Admin only)
  const handleClearExpenses = () => {
    localStorage.setItem('expenses', JSON.stringify(defaultExpenses));
    setExpenses(defaultExpenses);
    window.dispatchEvent(new Event('expensesCleared')); // Dispatch the event to notify listeners
  };

  useEffect(() => {
    // Initial load
    fetchExpenses();
    fetchBudgetStatus();

    // Listen for custom 'expensesCleared' event
    const handleExpensesCleared = () => fetchExpenses();
    window.addEventListener('expensesCleared', handleExpensesCleared);

    return () => {
      window.removeEventListener('expensesCleared', handleExpensesCleared);
    };
  }, []);

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const formattedTotalExpenses = isNaN(totalExpenses) ? 0 : totalExpenses;

  // Transform expenses into chart data
  const chartData = expenses.map((expense) => ({
    category: expense.category,
    amount: expense.amount,
  }));

  // Group expenses by date to calculate spending trends
  const spendingTrends = expenses.reduce((acc, expense) => {
    const date = expense.date; // Ensure each expense includes a 'date' field
    if (!acc[date]) {
      acc[date] = { date, amount: 0 };
    }
    acc[date].amount += expense.amount;
    return acc;
  }, {});

  // Convert spending trends to array format
  const trendData = Object.values(spendingTrends);

  return (
    <div style={{ width: '100%', padding: '20px' }}>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
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
        <div style={{ color: 'red', fontWeight: 'bold' }}>
          <h4>Warning: Your remaining budget is running low!</h4>
        </div>
      )}
    </div>
  );
};

export default ExpenseReport;
