import React, { useState, useEffect } from 'react';
import '../design/SetBudget.css';

const SetBudget = () => {
  const [budget, setBudget] = useState({ totalBudget: '', amountSpent: 0, timeframe: 'Daily' });
  const [timeframeSelected, setTimeframeSelected] = useState('Daily');

  useEffect(() => {
    const savedBudget = JSON.parse(localStorage.getItem('budget'));
    const savedTimeframe = localStorage.getItem('timeframe');
    const savedTimestamp = localStorage.getItem('timestamp');

    if (savedBudget && savedTimeframe) {
      const currentTimestamp = new Date().getTime();
      const timePassed = currentTimestamp - savedTimestamp;

      const expirationDuration =
        savedTimeframe === 'Daily' ? 24 * 60 * 60 * 1000 :
        savedTimeframe === 'Weekly' ? 7 * 24 * 60 * 60 * 1000 :
        savedTimeframe === 'Monthly' ? 30 * 24 * 60 * 60 * 1000 :
        0;

      if (timePassed >= expirationDuration) {
        localStorage.removeItem('budget');
        localStorage.removeItem('timestamp');
        localStorage.removeItem('timeframe');
      } else {
        setBudget(savedBudget);
        setTimeframeSelected(savedTimeframe);
      }
    }
  }, []);

  const handleSetBudget = (e) => {
    e.preventDefault();

    const totalBudgetValue = parseFloat(budget.totalBudget);

    if (isNaN(totalBudgetValue) || totalBudgetValue <= 0) {
      alert('Please enter a valid amount for the budget.');
      return;
    }

    localStorage.setItem('budget', JSON.stringify({ totalBudget: totalBudgetValue, amountSpent: 0 }));
    localStorage.setItem('timeframe', budget.timeframe);
    localStorage.setItem('timestamp', new Date().getTime().toString());

    alert('Budget set successfully!');
    setBudget({ ...budget, totalBudget: '', amountSpent: 0 });
  };

  return (
    <div className="set-budget-container">
      <h2>Set Budget</h2>
      <form onSubmit={handleSetBudget} className="set-budget-form">
        <div className="form-group">
          <label style={{ color: 'white' }} htmlFor="totalBudget">Total Budget</label>

          <input
            id="totalBudget"
            className="form-control total-budget"
            type="number"
            placeholder="Total Budget"
            value={budget.totalBudget}
            onChange={(e) => setBudget({ ...budget, totalBudget: e.target.value })}
          />
        </div>

        <div className="form-group">
        <label style={{ color: 'white' }} htmlFor="totalBudget">Timeframe</label>

          <select
            id="timeframe"
            className="form-control"
            value={budget.timeframe}
            onChange={(e) => setBudget({ ...budget, timeframe: e.target.value })}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        <button type="submit" className="submit-button">Set Budget</button>
      </form>
    </div>
  );
};

export default SetBudget;
