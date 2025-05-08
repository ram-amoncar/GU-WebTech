import React, { useState, useEffect } from "react";
import Calculator from "./Calculator";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    document.title = "React App - Calculator"
  }, [])

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️" : "🌙"}
      </button>
      <h1>Simple Calculator</h1>
      <Calculator />
    </div>
  );
}

export default App;
