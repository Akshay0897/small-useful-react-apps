import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function useInterval(delay, callBackFn) {

  const fnRef = React.useRef(null);

  useEffect(() => {
    fnRef.current = callBackFn;
  })

  const tick = () => fnRef.current();

  useEffect(() => {
  
    const id = setInterval(tick, delay);

    if (!delay) {
      clearInterval(id);
    }

    return () => {
      clearInterval(id);
    };
  }, [delay]);
}

export default function App() {

  const [counter, setcounter] = useState(0)
  const [delay, setDelay] = React.useState(null);

  useInterval(
    delay,
    () => setcounter(counter => counter + 1)
  );

  return (
    <div className="app">
      <h2>Pomodoro!</h2>

      <div className="timer">
        <span>{counter}</span>
      </div>

      <div className="buttons">
        <label htmlFor="delay">delay</label>
        <input value={delay} onChange={(e) => delay && setDelay(e.target.value)} id="delay"></input>
        <button onClick={() => setDelay(1000)}>Start</button>
        <button onClick={() => setDelay(null)}>Stop</button>
        <button onClick={() => setcounter(0)}>Reset</button>
      </div>
    </div>
  );
}
