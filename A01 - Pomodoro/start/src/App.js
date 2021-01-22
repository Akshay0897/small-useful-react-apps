import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {

  const [counter, setcounter] = React.useState(0);
  const [start, setStart] = useState(false);
  
  useEffect(() => {

    const id = setInterval(() => setcounter((count) => count + 1), 1000);

    if(!start){
      clearInterval(id);
    }

    return () => {
      clearInterval(id);
    };
  }, [start]);

  return (
    <div className="app">
      <h2>Pomodoro!</h2>

      <div className="timer">
        <span>{counter}</span>
      </div>

      <div className="buttons">
        <button onClick={() => setStart(true)}>Start</button>
        <button onClick={() => setStart(false)}>Stop</button>
        <button onClick={() => setcounter(0)}>Reset</button>
      </div>
    </div>
  );
}
