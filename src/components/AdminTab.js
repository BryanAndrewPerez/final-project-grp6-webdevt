  import React from "react";

  const AdminTab = () => {
    // Reset budget and expenses
    const resetData = () => {
      if (window.confirm("Are you sure you want to reset all data?")) {
        localStorage.setItem("budget", "0");
        localStorage.setItem("expenses", JSON.stringify([]));
        window.dispatchEvent(new Event("storage")); // Trigger update for all components
        alert("Data has been reset!");
      }
    };

    return (
      <div>
        <h2>Admin Panel</h2>
        <button onClick={resetData} style={{ backgroundColor: "red", color: "white" }}>
          Reset All Data
        </button>
      </div>
    );
  };

  export default AdminTab;
