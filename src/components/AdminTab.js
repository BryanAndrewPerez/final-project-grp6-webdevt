  import React from "react";

  const AdminTab = () => {
    
    const resetData = () => {
      if (window.confirm("Are you sure you want to reset all data?")) {
        localStorage.setItem("budget", "0");
        localStorage.setItem("expenses", JSON.stringify([]));
        window.dispatchEvent(new Event("storage")); 
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
