// Timer.js
import React, { useState, useEffect } from "react";

const Timer = ({ duration, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration); // Reset the timer when duration changes
  }, [duration]);

  useEffect(() => {
    if (timeLeft === 0) {
      onExpire();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onExpire]);

  return <div>{timeLeft} seconds remaining</div>;
};

export default Timer;
