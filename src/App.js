import React, { useState, useEffect } from "react";

const Stopwatch = () => {
  const [timer, setTimer] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [minutesInput, setMinutesInput] = useState("");
  const [secondsInput, setSecondsInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  const startStopwatch = () => {
    const newTimer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    setTimer(newTimer);
  };

  const pauseStopwatch = () => {
    clearInterval(timer);
    setTimer(null);
  };

  const resetStopwatch = () => {
    clearInterval(timer);
    setTimer(null);
    setSeconds(0);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const newMinutes = parseInt(minutesInput) || 0;
    const newSeconds = parseInt(secondsInput) || 0;
    const totalSeconds = newMinutes * 60 + newSeconds;
    setSeconds(totalSeconds);
    setIsEditing(false);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${minutes}:${remainingSeconds}`;
  };

  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      {isEditing ? (
        <div>
          <input
            type="number"
            placeholder="Minutes"
            value={minutesInput}
            onChange={(e) => setMinutesInput(e.target.value)}
          />
          <input
            type="number"
            placeholder="Seconds"
            value={secondsInput}
            onChange={(e) => setSecondsInput(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <p>{formatTime(seconds)}</p>
      )}

      <button onClick={startStopwatch}>Start</button>
      <button onClick={pauseStopwatch}>Pause</button>
      <button onClick={resetStopwatch}>Reset</button>
      {!isEditing && <button onClick={handleEdit}>Edit Time</button>}
    </div>
  );
};

export default Stopwatch;
