import React, { useState, useEffect } from 'react';

const TimeCounter = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num) => {
    return num < 10 ? '0' + num : num;
  };

  return (
    <div>
      <p>
        {formatTime(time.getHours())}:{formatTime(time.getMinutes())}:{formatTime(time.getSeconds())}
      </p>
    </div>
  );
};

export default TimeCounter;