import React, { useState, useEffect, useCallback } from "react";
import "./Calculator.css";
import cal from 'string-calculator'

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    setExpression((prev) => prev + value);
  };

  const calculateResult = useCallback(() => {
    try {
      setResult(cal(expression));
    } catch (error) {
      setResult("Error: " + error.message);
    }
  }, [expression]);

  const clear = useCallback(() => {
    setExpression("");
    setResult("");
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;

      if (/[0-9+\-*/.]/.test(key)) {
        setExpression((prev) => prev + key);
      } else if (key === "Enter") {
        calculateResult();
      } else if (key === "Backspace") {
        setExpression((prev) => prev.slice(0, -1));
      } else if (key === "Escape") {
        clear();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [calculateResult, clear]);

  return (
    <div className="calculator">
      <input type="text" value={expression} disabled />
      <input type="text" value={result} disabled />
      <div className="buttons">
        {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map((btn) => (
          <button key={btn} onClick={() => (btn === "=" ? calculateResult() : handleClick(btn))}>
            {btn}
          </button>
        ))}
        <button onClick={clear} className="clear">Clear</button>
      </div>
    </div>
  );
};

export default Calculator;
