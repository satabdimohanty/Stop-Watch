import React, { useState, useRef } from 'react';
import './Stopwatch.css';  // Import the CSS

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  // Use ReturnType<typeof setInterval> to avoid NodeJS type issues
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const pause = () => {
    if (isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    }
  };

  const resume = () => {
    start();
  };

  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  const recordLap = () => {
    setLaps((prev) => [...prev, time]);
  };

  return (
    <div className="stopwatch-container">
      <h1>Stopwatch</h1>
      <div className="stopwatch-time">{formatTime(time)}</div>
      <div className="stopwatch-buttons">
        {!isRunning ? (
          <button className="start-btn" onClick={start}>Start</button>
        ) : (
          <button className="pause-btn" onClick={pause}>Pause</button>
        )}
        <button className="resume-btn" onClick={resume} disabled={isRunning}>Resume</button>
        <button className="reset-btn" onClick={reset}>Reset</button>
        <button className="lap-btn" onClick={recordLap} disabled={!isRunning}>Lap</button>
      </div>

      <div className="laps-container">
        <h2>Laps</h2>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>
              <strong>Lap {index + 1}:</strong> {formatTime(lap)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Stopwatch;
