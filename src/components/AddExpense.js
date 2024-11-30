import React, { useState } from 'react';

const AddExpense = () => {
  const [expense, setExpense] = useState({ amount: '', description: '', category: '', date: '' });

  const categories = ['Food', 'Transportation', 'Utilities', 'Entertainment', 'Healthcare', 'Others'];

  const handleAddExpense = (e) => {
    e.preventDefault();

    
    const expenseAmount = parseFloat(expense.amount);
    if (isNaN(expenseAmount) || expenseAmount <= 0) {
      alert('Please enter a valid amount for the expense.');
      return;
    }

    
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];

    
    savedExpenses.push(expense);

    
    localStorage.setItem('expenses', JSON.stringify(savedExpenses));

    
    const currentBudget = JSON.parse(localStorage.getItem('budget')) || { totalBudget: 0, amountSpent: 0 };

    const updatedBudget = {
      totalBudget: currentBudget.totalBudget,
      amountSpent: currentBudget.amountSpent + expenseAmount,
    };

    localStorage.setItem('budget', JSON.stringify(updatedBudget));

    setExpense({ amount: '', description: '', category: '', date: '' });

    alert('Expense added successfully!');
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form onSubmit={handleAddExpense}>
        <input
          type="number"
          placeholder="Amount"
          value={expense.amount}
          onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={expense.description}
          onChange={(e) => setExpense({ ...expense, description: e.target.value })}
        />
        
        <select
          value={expense.category}
          onChange={(e) => setExpense({ ...expense, category: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <input
          type="date"
          value={expense.date}
          onChange={(e) => setExpense({ ...expense, date: e.target.value })}
        />
        
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
