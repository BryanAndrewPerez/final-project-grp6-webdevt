import React, { useEffect, useState } from 'react';
import '../design/ExpenseList.css'

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedExpense, setEditedExpense] = useState({ amount: '', description: '', category: '', date: '' });

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(savedExpenses);
  }, []);

  const updateBudgetOnEdit = (oldAmount, newAmount) => {
    const budget = JSON.parse(localStorage.getItem('budget')) || { totalBudget: 0, amountSpent: 0 };
    const amountDifference = newAmount - oldAmount;

    const updatedBudget = {
      ...budget,
      amountSpent: budget.amountSpent + amountDifference,
    };

    localStorage.setItem('budget', JSON.stringify(updatedBudget));
  };

  const handleRemoveExpense = (index) => {
    const expenseToRemove = expenses[index];
    const shouldReturnBudget = window.confirm(
      `Do you want to return the amount of ${expenseToRemove.amount} to the budget?`
    );

    if (shouldReturnBudget) {
      const currentBudget = JSON.parse(localStorage.getItem('budget')) || { totalBudget: 0, amountSpent: 0 };
      const updatedBudget = {
        totalBudget: currentBudget.totalBudget,
        amountSpent: currentBudget.amountSpent - expenseToRemove.amount,
      };
      localStorage.setItem('budget', JSON.stringify(updatedBudget));
    }

    const updatedExpenses = expenses.filter((_, i) => i !== index);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    setExpenses(updatedExpenses);
  };

  const handleEditExpense = (index) => {
    setEditingIndex(index);
    setEditedExpense(expenses[index]);
  };

  const handleSaveExpense = (index) => {
    const oldAmount = expenses[index].amount;
    const newAmount = editedExpense.amount;

    updateBudgetOnEdit(oldAmount, newAmount);

    const updatedExpenses = expenses.map((expense, i) =>
      i === index ? { ...expense, ...editedExpense } : expense
    );

    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    setExpenses(updatedExpenses);
    setEditingIndex(-1);
    setEditedExpense({ amount: '', description: '', category: '', date: '' });
  };

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);

    let sortedExpenses = [...expenses];

    switch (option) {
      case 'cost-asc':
        sortedExpenses.sort((a, b) => a.amount - b.amount);
        break;
      case 'cost-desc':
        sortedExpenses.sort((a, b) => b.amount - a.amount);
        break;
      case 'date-asc':
        sortedExpenses.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'date-desc':
        sortedExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default:
        break;
    }

    setExpenses(sortedExpenses);
  };

  const handleCategoryFilter = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    if (category === '') {
      setExpenses(savedExpenses);
    } else {
      const filteredExpenses = savedExpenses.filter((expense) => expense.category === category);
      setExpenses(filteredExpenses);
    }
  };

  return (
    <div>
      
      <div className="filter-sort-container">
        <h2>Expenses</h2>
        <div className="filter-sort-item">
          <label style={{ color: 'white' }}>Sort By: </label>
          <select value={sortOption} onChange={handleSortChange} className="filter-sort-select">
            <option value="">-- Select --</option>
            <option value="cost-asc">Cost (Low to High)</option>
            <option value="cost-desc">Cost (High to Low)</option>
            <option value="date-asc">Date (Oldest to Newest)</option>
            <option value="date-desc">Date (Newest to Oldest)</option>
          </select>
        </div>

        <div className="filter-sort-item">
          <label style={{ color: 'white' }}>Filter by Category: </label>
          <select value={selectedCategory} onChange={handleCategoryFilter} className="filter-sort-select">
            <option value="">-- All Categories --</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Others">Others</option>
          </select>
        </div>
     

      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <table className="expense-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) =>
              editingIndex === index ? (
                <tr key={index}>
                  <td>
                    <input
                      type="number"
                      value={editedExpense.amount}
                      onChange={(e) => setEditedExpense({ ...editedExpense, amount: parseFloat(e.target.value) })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedExpense.description}
                      onChange={(e) => setEditedExpense({ ...editedExpense, description: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedExpense.category}
                      onChange={(e) => setEditedExpense({ ...editedExpense, category: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={editedExpense.date}
                      onChange={(e) => setEditedExpense({ ...editedExpense, date: e.target.value })}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleSaveExpense(index)}>Save</button>
                    <button onClick={() => setEditingIndex(-1)}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={index}>
                  <td>{expense.amount}</td>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td>{expense.date}</td>
                  <td>
                    <button onClick={() => handleEditExpense(index)}>Edit</button>
                    <button onClick={() => handleRemoveExpense(index)}>Remove</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div> </div>
  );
};

export default ExpenseList;
